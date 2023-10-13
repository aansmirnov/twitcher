import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { Badges, BadgesMapBySetID } from 'src/types';

class ChatStore {
    badges: Badges[] = [];
    badgesMapBySetID: BadgesMapBySetID = {};

    constructor() {
        makeObservable(this, {
            badges: observable,
            badgesMapBySetID: observable,
            getBadges: action
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
}

const context = createContext(new ChatStore());
export const useChatStoreContext = () => useContext(context);