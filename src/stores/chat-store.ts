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

    getBadges = () => {
        apiHelix.getBadges().then(({ data }) => {
            runInAction(() => {
                this.badges = data;
                this.badgesMapBySetID = data.reduce((acc, next) => ({ ...acc, [next.set_id]: { versions: next.versions[0], set_id: next.set_id } }), {});
            });
        });
    };
}

const context = createContext(new ChatStore());
export const useChatStoreContext = () => useContext(context);