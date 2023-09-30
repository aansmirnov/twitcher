import { useEffect, useMemo } from 'react';
import { TWITCHER_CONFIG } from 'src/consts';
import { useCurrentUserStore } from 'src/stores';
import { Config, User } from 'src/types';

type UseCurrentUserReturnType = {
    loading: boolean;
    currentUser?: User;
}

export const useCurrentUser = (): UseCurrentUserReturnType => {
    const { getCurrentUser, loading, currentUser } = useCurrentUserStore;
    const configFromLocalStorage = useMemo(() => localStorage.getItem(TWITCHER_CONFIG), []);

    useEffect(() => {
        if (!configFromLocalStorage || currentUser) {
            return;
        }

        const parsedConfig = JSON.parse(configFromLocalStorage) as Config;
        if (Date.now() > parsedConfig.expired_at) {
            return;
        }

        getCurrentUser();
    }, [configFromLocalStorage, currentUser, getCurrentUser]);

    return {
        loading,
        currentUser
    };
};