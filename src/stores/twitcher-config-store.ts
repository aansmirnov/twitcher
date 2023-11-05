import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiAuth, apiHelix } from 'src/api';
import {
    CLIENT_ID,
    CLIENT_SECRET,
    TWITCHER_ACCESS_TOKEN,
    TWITCHER_CONFIG,
} from 'src/consts';
import { Config, User } from 'src/types';

class TwitcherConfigStore {
    config: Config | undefined = undefined;
    currentUser: User | undefined = undefined;
    loading = false;

    constructor() {
        makeObservable(this, {
            config: observable,
            currentUser: observable,
            loading: observable,
            getAccessToken: action,
        });

        this.loading = true;
        this.getConfigFromLocalStorage();
    }

    getCurrentUser = (cb?: VoidFunction) => {
        apiHelix
            .getUsers()
            .then(({ data }) => {
                runInAction(() => {
                    const [user] = data;
                    this.currentUser = user;
                });

                cb?.();
            })
            .finally(() => {
                runInAction(() => {
                    this.loading = false;
                });
            });
    };

    updateConfigState = (config: Config) => {
        const newConfig = {
            ...config,
            expired_at: new Date().setSeconds(config.expires_in),
        };
        runInAction(() => {
            this.config = newConfig;
        });

        localStorage.setItem(TWITCHER_CONFIG, JSON.stringify(newConfig));
        localStorage.setItem(TWITCHER_ACCESS_TOKEN, newConfig.access_token);
    };

    getAccessToken = (authCode: string) => {
        this.loading = true;
        apiAuth
            .getAccessToken({
                code: authCode,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            })
            .then((config) => {
                this.updateConfigState(config);
                this.getCurrentUser();
                window.location.href = 'http://localhost:3000';
            });
    };

    refreshToken = (token: string) => {
        apiAuth
            .refreshToken({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token,
            })
            .then(this.updateConfigState)
            .then(() => {
                // It's a hack.
                // @ToDo: fix this.
                setTimeout(() => {
                    this.getCurrentUser();
                }, 1000);
            });
    };

    getConfigFromLocalStorage = () => {
        const config = localStorage.getItem(TWITCHER_CONFIG);

        if (config) {
            const parsedConfig = JSON.parse(config) as Config;

            if (Date.now() > parsedConfig.expired_at) {
                this.refreshToken(parsedConfig.refresh_token);
                return;
            }

            runInAction(() => {
                this.config = parsedConfig;
            });

            this.getCurrentUser();
        } else {
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}

const context = createContext(new TwitcherConfigStore());
export const useTwitcherConfigStoreContext = () => useContext(context);
