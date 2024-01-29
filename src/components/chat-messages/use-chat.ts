import { useEffect } from 'react';
import { useChatEventsStoreContext, useChatStoreContext, useCurrentUserStoreContext } from 'src/stores';
import { BadgesMapBySetID, BanUserRequestBody, EmotesMapById } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
    emotesMapByName: EmotesMapById;
    deleteChatMessage: (messageID: string) => void;
    banUser: (body: BanUserRequestBody) => void;
    toggleUserMode: (userID: string, isMod: boolean) => void;
    toggleUserVip: (userID: string, isVip: boolean) => void;
};

export const useChat = (): UseChatReturnType => {
    const { currentUser } = useCurrentUserStoreContext();
    const { getBadges, badgesMapBySetID, getEmotes, emotesMapByName } =
        useChatStoreContext();
    const {
        deleteChatMessage: deleteMessage,
        banUser: ban,
        toggleChatUserMod,
        toggleChatVip,
    } = useChatEventsStoreContext();

    const deleteChatMessage = (messageID: string) => {
        if (!currentUser) {
            return;
        }

        deleteMessage({
            broadcaster_id: currentUser.id,
            moderator_id: currentUser.id,
            message_id: messageID,
        });
    };

    const banUser = (body: BanUserRequestBody) => {
        if (!currentUser) {
            return;
        }

        ban({
            data: body,
            params: {
                broadcaster_id: currentUser.id,
                moderator_id: currentUser.id,
            },
        });
    };

    const toggleUserMode = (userID: string, isMod: boolean) => {
        if (!currentUser) {
            return;
        }

        toggleChatUserMod(
            { user_id: userID, broadcaster_id: currentUser.id },
            isMod,
        );
    };

    const toggleUserVip = (userID: string, isVip: boolean) => {
        if (!currentUser) {
            return;
        }

        toggleChatVip(
            { user_id: userID, broadcaster_id: currentUser.id },
            isVip,
        );
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
        toggleUserMode,
        toggleUserVip,
    };
};
