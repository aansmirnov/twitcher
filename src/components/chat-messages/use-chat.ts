import { useEffect } from 'react';
import { useChatStoreContext, useTwitcherConfigStoreContext } from 'src/stores';
import { BadgesMapBySetID, EmotesMapById } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
    emotesMapByID: EmotesMapById;
}

export const useChat = (): UseChatReturnType => {
    const { currentUser } = useTwitcherConfigStoreContext();
    const {
        getBadges,
        badgesMapBySetID,
        getEmotes,
        emotesMapByID
    } = useChatStoreContext();

    useEffect(() => {
        if (!currentUser || Object.keys(badgesMapBySetID).length > 0) {
            return;
        }

        getBadges(currentUser.id);
    }, [badgesMapBySetID, currentUser, getBadges]);

    useEffect(() => {
        if (!currentUser || Object.keys(emotesMapByID).length > 0) {
            return;
        }

        getEmotes(currentUser.id);
    }, [currentUser, emotesMapByID, getEmotes]);

    return {
        badgesMapBySetID,
        emotesMapByID
    };
};