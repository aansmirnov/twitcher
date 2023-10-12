import { useEffect } from 'react';
import { useChatStoreContext } from 'src/stores';
import { BadgesMapBySetID } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
}

export const useChat = (): UseChatReturnType => {
    const { getBadges, badgesMapBySetID } = useChatStoreContext();

    useEffect(() => {
        if (Object.keys(badgesMapBySetID).length > 0) {
            return;
        }

        getBadges();
    }, [badgesMapBySetID, getBadges]);

    return {
        badgesMapBySetID
    };
};