import { useEffect } from 'react';
import { useChatEventsStoreContext, useTwitcherConfigStoreContext } from 'src/stores';

type UseChatEventsReturnType = {
    isInitialized: boolean;
    loading: boolean;
}

export const useChatEvents = (): UseChatEventsReturnType => {
    const { currentUser } = useTwitcherConfigStoreContext();
    const { createConnection, isInitialized, loading } = useChatEventsStoreContext();

    useEffect(() => {
        if (!isInitialized && currentUser) {
            createConnection(currentUser.login, true);
        }
    }, [createConnection, currentUser, isInitialized]);

    return {
        isInitialized,
        loading
    };
};