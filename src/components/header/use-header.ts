import { useCallback, useEffect } from 'react';
import {
    useStreamStoreContext,
    useTwitcherConfigStoreContext,
} from 'src/stores';

const ONE_MINUTE = 60000;

export const useHeader = () => {
    const { currentUser } = useTwitcherConfigStoreContext();
    const { getStream, isSendRequest } = useStreamStoreContext();
    const sendRequest = useCallback(
        (userID: string) => {
            getStream(userID);
        },
        [getStream],
    );

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        if (!isSendRequest) {
            sendRequest(currentUser.id);
            return;
        }

        const timer = setInterval(() => {
            sendRequest(currentUser.id);
        }, ONE_MINUTE);

        return () => {
            clearInterval(timer);
        };
    }, [currentUser, isSendRequest, sendRequest]);
};
