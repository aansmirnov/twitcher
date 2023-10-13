import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { Badges, BadgesMapBySetID, Emote, EmotesMapById } from 'src/types';

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

    getBadges = (userID: string) => {
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
            });
    };

    getEmotes = (userID: string) => {
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
            });
    };
}

const context = createContext(new ChatStore());
export const useChatStoreContext = () => useContext(context);