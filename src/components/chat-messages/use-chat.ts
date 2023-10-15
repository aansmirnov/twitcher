import { useEffect } from 'react';
import { useChatStoreContext, useTwitcherConfigStoreContext } from 'src/stores';
import { BadgesMapBySetID, EmotesMapById } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
    emotesMapByName: EmotesMapById;
}

export const useChat = (): UseChatReturnType => {
    const { currentUser } = useTwitcherConfigStoreContext();
    const {
        getBadges,
        badgesMapBySetID,
        getEmotes,
        emotesMapByName
    } = useChatStoreContext();

    useEffect(() => {
        if (!currentUser || Object.keys(badgesMapBySetID).length > 0) {
            return;
        }

        getBadges(currentUser.id);
    }, [badgesMapBySetID, currentUser, getBadges]);

    useEffect(() => {
        if (!currentUser || Object.keys(emotesMapByName).length > 0) {
            return;
        }

        getEmotes(currentUser.id);
    }, [currentUser, emotesMapByName, getEmotes]);

    return {
        badgesMapBySetID,
        emotesMapByName
    };
};