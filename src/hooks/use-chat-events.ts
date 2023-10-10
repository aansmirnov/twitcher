import { useEffect } from 'react';
import { useChatEventsStoreContext, useCurrentUserStore } from 'src/stores';

type UseChatEventsReturnType = {
    isInitialized: boolean;
    loading: boolean;
}

export const useChatEvents = (): UseChatEventsReturnType => {
    const { currentUser } = useCurrentUserStore;
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