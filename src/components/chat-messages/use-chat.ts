import { useEffect } from 'react';
import { useChatEventsStoreContext, useChatStoreContext, useTwitcherConfigStoreContext } from 'src/stores';
import { BadgesMapBySetID, EmotesMapById } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
    emotesMapByName: EmotesMapById;
    deleteChatMessage: (messageID: string) => void;
}

export const useChat = (): UseChatReturnType => {
    const { currentUser } = useTwitcherConfigStoreContext();
    const {
        getBadges,
        badgesMapBySetID,
        getEmotes,
        emotesMapByName,
    } = useChatStoreContext();
    const { deleteChatMessage: deleteMessage } = useChatEventsStoreContext();

    const deleteChatMessage = (messageID: string) => {
        if (!currentUser) {
            return;
        }

        deleteMessage({ broadcaster_id: currentUser.id, moderator_id: currentUser.id, message_id: messageID });
    };

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
        emotesMapByName,
        deleteChatMessage
    };
};