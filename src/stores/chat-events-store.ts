import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { TWITCHER_ACCESS_TOKEN } from 'src/consts';
import {
    BanUserIn,
    DeleteChatMessageIn,
    ManageUserChatIn,
    TwitchIrcMessage,
    UnbanUserIn,
    WithAdditionalParams,
} from 'src/types';
import { getItemFromLocalStorage, parseTwitchIrcMessage } from 'src/utils';

const MAX_SIZE_MESSAGES_ARRAY = 100;
const NUMBER_OF_ELEMENTS_TO_REMOVE = 20;

class ChatEventsStore {
    isInitialized = false;
    loading = false;
    messages: TwitchIrcMessage[] = [];
    vipAndModUsersMap: Record<string, { isMod: boolean; isVip: boolean }> = {};

    private userLogin: string | undefined;

    constructor() {
        makeObservable(this, {
            isInitialized: observable,
            loading: observable,
            messages: observable,
            vipAndModUsersMap: observable.ref,
            createConnection: action,
            connectToChat: action,
            deleteChatMessage: action,
            banUser: action,
            toggleChatUserMod: action,
            toggleChatVip: action,
            unbanUser: action,
        });
    }

    private get copyMessages() {
        return JSON.parse(JSON.stringify(this.messages)) as TwitchIrcMessage[];
    }

    private getCorrectMessagesList = (newIrcMessage: TwitchIrcMessage) => {
        const copy = this.copyMessages;

        if (copy.length === MAX_SIZE_MESSAGES_ARRAY) {
            const slicedMessages = copy.slice(
                0,
                copy.length - NUMBER_OF_ELEMENTS_TO_REMOVE,
            );

            return [newIrcMessage].concat(slicedMessages);
        }

        copy.unshift(newIrcMessage);
        return copy;
    };

    private addVipOrModUserToMap = (
        userID: string,
        isVip: boolean,
        isMod: boolean,
    ) => {
        runInAction(() => {
            this.vipAndModUsersMap = {
                ...this.vipAndModUsersMap,
                [userID]: { isVip, isMod },
            };
        });
    };

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
        websocket.send(
            `PASS oauth:${getItemFromLocalStorage<string>(
                TWITCHER_ACCESS_TOKEN,
            )}`,
        );
        websocket.send(`NICK ${this.userLogin}`);
        websocket.send(`JOIN #${this.userLogin}`);
    };

    listenMessages = (websocket: WebSocket) => {
        websocket.onmessage = (event) => {
            const message = (event.data as string)
                .split('\r\n')
                .filter((it): it is string => it.length > 0);
            message.forEach((it) => {
                const parsedMessage = parseTwitchIrcMessage(it);

                if (!parsedMessage) {
                    return;
                }

                const userID = parsedMessage?.tags?.userID;

                if (userID && !this.vipAndModUsersMap[userID]) {
                    const isVip = Boolean(parsedMessage.tags?.badges?.['vip']);
                    const isMod = Boolean(
                        parsedMessage.tags?.badges?.['moderator'],
                    );

                    if (isVip || isMod) {
                        this.addVipOrModUserToMap(userID, isVip, isMod);
                    }
                }

                switch (parsedMessage.command?.command) {
                    case 'NOTICE':
                    case 'PRIVMSG': {
                        runInAction(() => {
                            this.messages =
                                this.getCorrectMessagesList(parsedMessage);
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
                    default: {
                        break;
                    }
                }
            });
        };
    };

    deleteChatMessage = (params: DeleteChatMessageIn) => {
        apiHelix.deleteChatMessage(params).then(() => {
            const copy = this.copyMessages;
            const index = copy.findIndex(
                (it) => it.tags?.id === params.message_id,
            );

            if (index !== -1) {
                copy[index] = {
                    ...copy[index],
                    parameters: '<Message Deleted>',
                    tags: { ...copy[index].tags, emotes: {} },
                };
                runInAction(() => {
                    this.messages = copy;
                });
            }
        });
    };

    banUser = (body: BanUserIn & WithAdditionalParams) => {
        const { onFailure, onSuccess, ...rest } = body;
        apiHelix
            .banUser(rest)
            .then(() => {
                const copy = this.copyMessages;
                const updatedMessagesArray = copy.map((it) => {
                    if (it.tags?.userID === body.data.user_id) {
                        return {
                            ...it,
                            tags: {
                                ...it.tags,
                                emotes: {},
                            },
                            parameters: '<Message Deleted>',
                        };
                    }

                    return it;
                });

                runInAction(() => {
                    this.messages = updatedMessagesArray;
                });

                onSuccess?.();
            })
            .catch(onFailure);
    };

    toggleChatUserMod = (
        body: ManageUserChatIn & WithAdditionalParams,
        isMod: boolean,
    ) => {
        const { onFailure, onSuccess, ...rest } = body;
        const request = isMod
            ? apiHelix.removeChannelModerator(rest)
            : apiHelix.addChannelModerator(rest);

        request
            .then(() => {
                const isVip =
                    this.vipAndModUsersMap[body.user_id]?.isVip || false;
                this.addVipOrModUserToMap(body.user_id, isVip, !isMod);

                onSuccess?.();
            })
            .catch(onFailure);
    };

    toggleChatVip = (
        body: ManageUserChatIn & WithAdditionalParams,
        isVip: boolean,
    ) => {
        const { onFailure, onSuccess, ...rest } = body;
        const request = isVip
            ? apiHelix.removeChannelVip(rest)
            : apiHelix.addChannelVip(rest);

        request
            .then(() => {
                const isMod =
                    this.vipAndModUsersMap[body.user_id]?.isMod || false;
                this.addVipOrModUserToMap(body.user_id, !isVip, isMod);

                onSuccess?.();
            })
            .catch(onFailure);
    };

    unbanUser = (params: UnbanUserIn & WithAdditionalParams) => {
        const { onFailure, onSuccess, ...rest } = params;
        apiHelix.unbanUser(rest).then(onSuccess).catch(onFailure);
    };
}

const context = createContext(new ChatEventsStore());
export const useChatEventsStoreContext = () => useContext(context);
