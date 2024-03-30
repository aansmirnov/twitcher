import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { User } from 'src/types';

class CurrentUserStore {
    currentUser: User | undefined = undefined;
    currentUserLoading = false;

    constructor() {
        makeObservable(this, {
            currentUser: observable,
            currentUserLoading: observable,
            getCurrentUser: action,
        });
    }

    getCurrentUser = () => {
        runInAction(() => {
            this.currentUserLoading = true;
        });

        apiHelix.getUsers().then(({ data }) => {
            const [user] = data;

            runInAction(() => {
                this.currentUser = user;
                this.currentUserLoading = false;
            });
        });
    };
}

const context = createContext(new CurrentUserStore());
export const useCurrentUserStoreContext = () => useContext(context);
