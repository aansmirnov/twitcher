import { makeObservable, runInAction, observable, action } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { User } from 'src/types';

class CurrentUserStore {
    loading = false;
    currentUser: User | undefined;

    constructor() {
        makeObservable(this, {
            loading: observable,
            currentUser: observable,
            getCurrentUser: action
        });
    }

    getCurrentUser = () => {
        this.loading = true;

        apiHelix
            .getUsers()
            .then(({ data }) => {
                runInAction(() => {
                    const [user] = data;
                    this.currentUser = user;
                });
            })
            .finally(() => {
                runInAction(() => {
                    this.loading = false;
                });
            });
    };
}

const context = createContext(new CurrentUserStore());
export const useCurrentUserStoreContext = () => useContext(context);