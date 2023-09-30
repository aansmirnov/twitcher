import { makeObservable, runInAction, observable, action } from 'mobx';
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
            .finally(() => this.loading = false);
    };
}

export const useCurrentUserStore = new CurrentUserStore();