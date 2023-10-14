import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { TWITCHER_ACCESS_TOKEN } from 'src/consts';
import { TwitchIrcMessage } from 'src/types';
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
        });
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
}

const context = createContext(new ChatEventsStore());
export const useChatEventsStoreContext = () => useContext(context);
