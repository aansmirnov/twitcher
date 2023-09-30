import { useEffect } from 'react';
import { useChatEventsStore, useCurrentUserStore } from 'src/stores';

type UseChatEventsReturnType = {
    isInitialized: boolean;
    loading: boolean;
}

export const useChatEvents = (): UseChatEventsReturnType => {
    const { currentUser } = useCurrentUserStore;
    const { createConnection, isInitialized, loading } = useChatEventsStore;

    useEffect(() => {
        if (!isInitialized && currentUser) {
            createConnection(currentUser.login);
        }
    }, [createConnection, currentUser, isInitialized]);

    return {
        isInitialized,
        loading
    };
};