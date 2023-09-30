import { action, makeObservable, observable } from 'mobx';
import { TWITCHER_ACCESS_TOKEN } from 'src/consts';

class ChatEventsStore {
    isInitialized = false;
    loading = false;
    private userLogin: string | undefined;
    private websocket: WebSocket | undefined;

    constructor() {
        makeObservable(this, {
            isInitialized: observable,
            loading: observable,
            createConnection: action
        });
    }

    createConnection = (userLogin: string) => {
        this.loading = true;
        this.websocket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

        this.websocket.onopen = () => {
            this.isInitialized = true;
            this.loading = false;
            this.userLogin = userLogin;

            this.connectToTheChat();
        };
    };

    connectToTheChat = () => {
        if (!this.websocket) {
            throw Error('Failed to connect to chat.');
        }

        this.websocket.send('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
        this.websocket.send(`PASS oauth:${localStorage.getItem(TWITCHER_ACCESS_TOKEN)}`);
        this.websocket.send(`NICK ${this.userLogin}`);
        this.websocket.send(`JOIN #${this.userLogin}`);

        this.listenMessages();
    };

    listenMessages = () => {
        if (!this.websocket) {
            throw Error('Failed to listem messages.');
        }

        this.websocket.onmessage = (event) => {
            const message = (event.data as string).split('\r\n').filter((it): it is string => Boolean(it.length > 0));
            // eslint-disable-next-line no-console
            console.log(message);
        };
    };
}

export const useChatEventsStore = new ChatEventsStore();
