import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { TWITCHER_ACCESS_TOKEN } from 'src/consts';
import { BanUserIn, DeleteChatMessageIn, ManageUserChatIn, TwitchIrcMessage } from 'src/types';
import { parseTwitchIrcMessage } from 'src/utils';

class ChatEventsStore {
    isInitialized = false;
    loading = false;
    messages: TwitchIrcMessage[] = [];

    private userLogin: string | undefined;

    constructor() {
        makeObservable(this, {
            isInitialized: observable,
            loading: observable,
            messages: observable,
            createConnection: action,
            connectToChat: action,
            deleteChatMessage: action,
            banUser: action,
            toggleChatUserMod: action,
            toggleChatVip: action,
        });
    }

    private get copyMessages() {
        return JSON.parse(JSON.stringify(this.messages)) as TwitchIrcMessage[];
    }

    createConnection = (userLogin: string, shouldListenMessages = false) => {
        this.loading = shouldListenMessages;
        const websocket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

        if (shouldListenMessages) {
            websocket.onopen = () => {
                runInAction(() => {
                    this.isInitialized = true;
                    this.loading = false;
                    this.userLogin = userLogin;
                });

                this.connectToChat(websocket);
                this.listenMessages(websocket);
            };
        }

        return websocket;
    };

    connectToChat = (websocket: WebSocket) => {
        websocket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        websocket.send(`PASS oauth:${localStorage.getItem(TWITCHER_ACCESS_TOKEN)}`);
        websocket.send(`NICK ${this.userLogin}`);
        websocket.send(`JOIN #${this.userLogin}`);
    };

    listenMessages = (websocket: WebSocket) => {
        websocket.onmessage = (event) => {
            const message = (event.data as string).split('\r\n').filter((it): it is string => it.length > 0);
            message.forEach((it) => {
                const parsedMessage = parseTwitchIrcMessage(it);

                if (!parsedMessage) {
                    return;
                }

                switch (parsedMessage.command?.command) {
                    case 'NOTICE':
                    case 'PRIVMSG': {
                        runInAction(() => {
                            this.messages.unshift(parsedMessage);
                        });
                        break;
                    }
                    case 'PING': {
                        websocket.send(`PONG ${parsedMessage.parameters}`);
                        break;
                    }
                    case 'CLEARCHAT': {
                        if (parsedMessage.tags?.targetUserId) {
                            break;
                        }

                        runInAction(() => {
                            this.messages = [];
                        });
                        break;
                    }
                    default: { break; }
                }
            });
        };
    };

    deleteChatMessage = (params: DeleteChatMessageIn) => {
        apiHelix.deleteChatMessage(params)
            .then(() => {
                const copy = this.copyMessages;
                const index = copy.findIndex((it) => it.tags?.id === params.message_id);

                if (index !== -1) {
                    copy[index] = { ...copy[index], parameters: '<Message Deleted>', tags: { ...copy[index].tags, emotes: {} } };
                    runInAction(() => {
                        this.messages = copy;
                    });
                }
            });
    };

    banUser = (body: BanUserIn) => {
        apiHelix.banUser(body)
            .then(() => {
                const copy = this.copyMessages;
                const updatedMessagesArray = copy.map((it) => {
                    if (it.tags?.userID === body.data.user_id) {
                        return {
                            ...it,
                            tags: {
                                ...it.tags,
                                emotes: {}
                            },
                            parameters: '<Message Deleted>'
                        };
                    }

                    return it;
                });

                runInAction(() => {
                    this.messages = updatedMessagesArray;
                });
            }
            );
    };

    toggleChatUserMod = (body: ManageUserChatIn, isMod: boolean) => {
        isMod ? apiHelix.removeChannelModerator(body) : apiHelix.addChannelModerator(body);
    };

    toggleChatVip = (body: ManageUserChatIn, isVip: boolean) => {
        isVip ? apiHelix.removeChannelVip(body) : apiHelix.addChannelVip(body);
    };
}

const context = createContext(new ChatEventsStore());
export const useChatEventsStoreContext = () => useContext(context);
