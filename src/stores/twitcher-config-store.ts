import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { apiAuth } from 'src/api';
import {
    CLIENT_ID,
    CLIENT_SECRET,
    TWITCHER_ACCESS_TOKEN,
    TWITCHER_CONFIG,
} from 'src/consts';
import { Config } from 'src/types';
import { getItemFromLocalStorage, setItemToLocalStorage } from 'src/utils';

class TwitcherConfigStore {
    config: Config | undefined = undefined;
    loading = false;

    constructor() {
        makeObservable(this, {
            config: observable,
            loading: observable,
            getAccessToken: action,
        });

        this.loading = true;
        this.getConfigFromLocalStorage();
    }

    updateConfigState = (config: Config) => {
        const newConfig = {
            ...config,
            expired_at: new Date().setSeconds(config.expires_in),
        };
        runInAction(() => {
            this.config = newConfig;
        });

        setItemToLocalStorage(TWITCHER_CONFIG, newConfig);
        setItemToLocalStorage(TWITCHER_ACCESS_TOKEN, newConfig.access_token);
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
                window.location.href = 'http://localhost:3000';

                runInAction(() => {
                    this.loading = false;
                });
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
            .then((config) => {
                this.updateConfigState(config);

                runInAction(() => {
                    this.loading = false;
                });
            });
    };

    getConfigFromLocalStorage = () => {
        const config = getItemFromLocalStorage<Config>(TWITCHER_CONFIG);

        if (config) {
            if (Date.now() > config.expired_at) {
                this.refreshToken(config.refresh_token);
                return;
            }

            runInAction(() => {
                this.config = config;
                this.loading = false;
            });
        } else {
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}

const context = createContext(new TwitcherConfigStore());
export const useTwitcherConfigStoreContext = () => useContext(context);
