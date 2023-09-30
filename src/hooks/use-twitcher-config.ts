import { useCallback, useEffect, useState } from 'react';
import { apiAuth } from 'src/api';
import { CLIENT_ID, CLIENT_SECRET, TWITCHER_ACCESS_TOKEN, TWITCHER_CONFIG } from 'src/consts';
import { Config } from 'src/types';

export const useTwitcherConfig = () => {
    const [config, setConfig] = useState<Config>();
    const [loading, setLoading] = useState(true);

    const updateConfigState = (newConfig: Config) => {
        const cfg = { ...newConfig, expired_at: new Date().setSeconds(newConfig.expires_in) };

        setConfig(cfg);
        localStorage.setItem(TWITCHER_CONFIG, JSON.stringify(cfg));
        localStorage.setItem(TWITCHER_ACCESS_TOKEN, cfg.access_token);
    };
    const getAccessToken = useCallback((authCode: string) => {
        apiAuth
            .getAccessToken({
                code: authCode,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:3000',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            })
            .then(updateConfigState)
            .finally(() => setLoading(false));
    }, []);
    const refreshToken = useCallback((token: string) => {
        setLoading(true);
        localStorage.removeItem(TWITCHER_ACCESS_TOKEN);
        localStorage.removeItem(TWITCHER_CONFIG);

        apiAuth
            .refreshToken({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token
            })
            .then(updateConfigState)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!config) {
            const configFromLocalStorage = localStorage.getItem(TWITCHER_CONFIG);

            if (configFromLocalStorage) {
                const parsedConfig = JSON.parse(configFromLocalStorage) as Config;

                if (Date.now() > parsedConfig.expired_at) {
                    refreshToken(parsedConfig.refresh_token);
                    return;
                }
                setConfig(parsedConfig);
            }
            setLoading(false);
        }
    }, [config, loading, refreshToken]);

    return {
        getAccessToken,
        loading,
        config
    };
};