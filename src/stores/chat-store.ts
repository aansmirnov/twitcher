import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { TWITCHER_BADGES, TWITCHER_EMOTES } from 'src/consts';
import { Badges, BadgesMapBySetID, Emote, EmotesMapById } from 'src/types';

const THREE_DAYS = 259200000;
type LocalStorageData<T> = {
    data: T;
    expired_at: number;
}
type ChatData<T, U> = {
    data: T;
    map: U;
}

class ChatStore {
    badges: Badges[] = [];
    badgesMapBySetID: BadgesMapBySetID = {};
    emotes: Emote[] = [];
    emotesMapByID: EmotesMapById = {};

    constructor() {
        makeObservable(this, {
            badges: observable,
            badgesMapBySetID: observable,
            emotes: observable,
            emotesMapByID: observable,
            getBadges: action,
            getEmotes: action,
        });
    }

    private setChatDataToLocalStorage = <T>(key: string, data: T) => {
        const object: LocalStorageData<T> = { data, expired_at: Date.now() + THREE_DAYS };
        localStorage.setItem(key, JSON.stringify(object));
    };

    private getChatDataFromLocalStorage = <T>(key: string) => {
        const dataFromLocalStorage = localStorage.getItem(key);

        if (!dataFromLocalStorage) {
            return null;
        }

        const parsedData = JSON.parse(dataFromLocalStorage) as unknown as LocalStorageData<T>;
        if (Date.now() > parsedData.expired_at) {
            return null;
        }

        return parsedData.data;
    };

    getBadges = (userID: string) => {
        const badges = this.getChatDataFromLocalStorage<ChatData<Badges[], BadgesMapBySetID>>(TWITCHER_BADGES);

        if (badges) {
            this.badges = badges.data;
            this.badgesMapBySetID = badges.map;
            return;
        }

        Promise
            .all([apiHelix.getChanngelBadges({ broadcaster_id: userID }), apiHelix.getBadges()])
            .then((response) => {
                const [channelBadges, globalBadges] = response;
                const allBadges = [...channelBadges.data, ...globalBadges.data];

                runInAction(() => {
                    this.badges = allBadges;
                    this.badgesMapBySetID = allBadges
                        .reduce((acc, next) => ({ ...acc, [next.set_id]: { versions: next.versions[0], set_id: next.set_id } }), {});
                });

                this.setChatDataToLocalStorage(TWITCHER_BADGES, { data: this.badges, map: this.badgesMapBySetID });
            });
    };

    getEmotes = (userID: string) => {
        const emotes = this.getChatDataFromLocalStorage<ChatData<Emote[], EmotesMapById>>(TWITCHER_EMOTES);

        if (emotes) {
            this.emotes = emotes.data;
            this.emotesMapByID = emotes.map;
            return;
        }

        Promise
            .all([apiHelix.getChannelEmotes({ broadcaster_id: userID }), apiHelix.getEmotes()])
            .then((response) => {
                const [channelEmotes, globalEmotes] = response;
                const allEmotes = [...channelEmotes.data, ...globalEmotes.data];

                runInAction(() => {
                    this.emotes = allEmotes;
                    this.emotesMapByID = allEmotes
                        .reduce((acc, next) => ({ ...acc, [next.id]: next }), {});
                });

                this.setChatDataToLocalStorage(TWITCHER_EMOTES, { data: this.emotes, map: this.emotesMapByID });
            });
    };
}

const context = createContext(new ChatStore());
export const useChatStoreContext = () => useContext(context);