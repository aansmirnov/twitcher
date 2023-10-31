import { useEffect } from 'react';
import { useChatEventsStoreContext, useChatStoreContext, useTwitcherConfigStoreContext } from 'src/stores';
import { BadgesMapBySetID, BanUserRequestBody, EmotesMapById } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
    emotesMapByName: EmotesMapById;
    deleteChatMessage: (messageID: string) => void;
    banUser: (body: BanUserRequestBody) => void;
}

export const useChat = (): UseChatReturnType => {
    const { currentUser } = useTwitcherConfigStoreContext();
    const {
        getBadges,
        badgesMapBySetID,
        getEmotes,
        emotesMapByName,
    } = useChatStoreContext();
    const { deleteChatMessage: deleteMessage, banUser: ban } = useChatEventsStoreContext();

    const deleteChatMessage = (messageID: string) => {
        if (!currentUser) {
            return;
        }

        deleteMessage({ broadcaster_id: currentUser.id, moderator_id: currentUser.id, message_id: messageID });
    };

    const banUser = (body: BanUserRequestBody) => {
        if (!currentUser) {
            return;
        }

        ban({ data: body, params: { broadcaster_id: currentUser.id, moderator_id: currentUser.id } });
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
        deleteChatMessage,
        banUser,
    };
};