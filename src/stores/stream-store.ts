import {
    makeObservable,
    observable,
    action,
    computed,
    runInAction,
} from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { Stream } from 'src/types';

class StreamStore {
    ownStream: Stream | undefined;
    isSendRequest = false;

    constructor() {
        makeObservable(this, {
            ownStream: observable,
            isSendRequest: observable,
            ownStreamViewers: computed,
            isOwnStreamLive: computed,
            getStream: action,
        });
    }

    get isOwnStreamLive() {
        return this.ownStream?.type === 'live';
    }

    get ownStreamViewers() {
        return this.ownStream?.viewer_count ?? 0;
    }

    getStream = (userID: string) => {
        apiHelix
            .getStreams({ user_id: [userID] })
            .then(({ data }) => {
                const ownStream = data.find((it) => it.user_id === userID); // ownStream can be undefined

                runInAction(() => {
                    this.ownStream = ownStream;
                });
            })
            .finally(() => {
                runInAction(() => {
                    this.isSendRequest = true;
                });
            });
    };
}

const context = createContext(new StreamStore());
export const useStreamStoreContext = () => useContext(context);
