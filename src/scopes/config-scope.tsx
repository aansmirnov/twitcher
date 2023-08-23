import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Config } from 'src/types';
import { apiAuth } from 'src/api';
import { CLIENT_ID, CLIENT_SECRET } from 'src/consts';

type ConfigScopeProps = {
    children: React.ReactNode;
}

type ConfigScopeContextType = {
    config?: Config;
    loading: boolean;
    getAccessToken: (authCode: string) => void;
}

const ConfigScopeContext = createContext<ConfigScopeContextType>({
    config: undefined,
    loading: false,
    getAccessToken: () => null
});

export const ConfigScope = ({ children }: ConfigScopeProps) => {
    const [config, setConfig] = useState<Config>();
    const [loading, setLoading] = useState(true);

    const updateConfigState = (newConfig: Config) => {
        setConfig(newConfig);
        localStorage.setItem('twitcher_config', JSON.stringify(newConfig));
    };
    const getAccessToken = useCallback((authCode: string) => {
        setLoading(true);

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
            const configFromLocalStorage = localStorage.getItem('twitcher_config');

            if (configFromLocalStorage) {
                const parsedConfig = JSON.parse(configFromLocalStorage) as Config;
                refreshToken(parsedConfig.refresh_token);

                return;
            }

            setLoading(false);
        }
    }, [config, refreshToken]);

    return (
        <ConfigScopeContext.Provider value={{
            config,
            loading,
            getAccessToken
        }}>
            {children}
        </ConfigScopeContext.Provider>
    );
};

export const useConfigScope = () => useContext(ConfigScopeContext);