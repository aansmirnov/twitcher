import { useEffect } from 'react';
import { TWITCHER_ACCESS_TOKEN } from 'src/consts';
import {
    useTwitcherConfigStoreContext,
    useCurrentUserStoreContext,
} from 'src/stores';
import { User } from 'src/types';
import { getItemFromLocalStorage } from 'src/utils';

type UseCurrentUserReturnType = {
    currentUser?: User;
    currentUserLoading: boolean;
};

export const useCurrentUser = (): UseCurrentUserReturnType => {
    const { currentUser, currentUserLoading, getCurrentUser } =
        useCurrentUserStoreContext();
    const { config, loading } = useTwitcherConfigStoreContext();
    const accessToken = getItemFromLocalStorage<string>(TWITCHER_ACCESS_TOKEN);

    useEffect(() => {
        if (!config || currentUser || loading) {
            return;
        }

        if (config.access_token === accessToken) {
            getCurrentUser();
        }
    }, [accessToken, config, currentUser, getCurrentUser, loading]);

    return {
        currentUserLoading,
        currentUser,
    };
};
