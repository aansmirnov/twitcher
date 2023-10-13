import { useEffect } from 'react';
import { useChatStoreContext, useTwitcherConfigStoreContext } from 'src/stores';
import { BadgesMapBySetID } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
}

export const useChat = (): UseChatReturnType => {
    const { currentUser } = useTwitcherConfigStoreContext();
    const { getBadges, badgesMapBySetID } = useChatStoreContext();

    useEffect(() => {
        if (!currentUser || Object.keys(badgesMapBySetID).length > 0) {
            return;
        }

        getBadges(currentUser.id);
    }, [badgesMapBySetID, currentUser, getBadges]);

    return {
        badgesMapBySetID
    };
};