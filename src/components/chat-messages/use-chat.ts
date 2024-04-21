import { RenderToastParams, useToast } from 'src/hooks';
import { useEffect } from 'react';
import {
    useChatEventsStoreContext,
    useChatStoreContext,
    useCurrentUserStoreContext,
} from 'src/stores';
import { BadgesMapBySetID, BanUserRequestBody, EmotesMapById } from 'src/types';

type UseChatReturnType = {
    badgesMapBySetID: BadgesMapBySetID;
    emotesMapByName: EmotesMapById;
    deleteChatMessage: (messageID: string) => void;
    banUser: (body: BanUserRequestBody, userName?: string) => void;
    toggleUserMode: (userID: string, isMod: boolean, userName?: string) => void;
    toggleUserVip: (userID: string, isVip: boolean, userName?: string) => void;
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
    const { renderToast } = useToast();

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

    const banUser = (body: BanUserRequestBody, userName?: string) => {
        if (!currentUser) {
            return;
        }

        const toastProps: RenderToastParams = {
            type: 'ban',
            action: 'add',
            userName,
        };

        ban({
            data: body,
            params: {
                broadcaster_id: currentUser.id,
                moderator_id: currentUser.id,
            },
            onSuccess: () => renderToast(toastProps),
            onFailure: () =>
                renderToast({
                    ...toastProps,
                    success: false,
                }),
        });
    };

    const toggleUserMode = (
        userID: string,
        isMod: boolean,
        userName?: string,
    ) => {
        if (!currentUser) {
            return;
        }

        const toastProps: RenderToastParams = {
            type: 'mod',
            action: isMod ? 'delete' : 'add',
            userName,
        };

        toggleChatUserMod(
            {
                user_id: userID,
                broadcaster_id: currentUser.id,
                onSuccess: () => renderToast(toastProps),
                onFailure: () =>
                    renderToast({
                        ...toastProps,
                        success: false,
                    }),
            },
            isMod,
        );
    };

    const toggleUserVip = (
        userID: string,
        isVip: boolean,
        userName?: string,
    ) => {
        if (!currentUser) {
            return;
        }

        const toastProps: RenderToastParams = {
            type: 'vip',
            action: isVip ? 'delete' : 'add',
            userName,
        };

        toggleChatVip(
            {
                user_id: userID,
                broadcaster_id: currentUser.id,
                onSuccess: () => renderToast(toastProps),
                onFailure: () => renderToast({ ...toastProps, success: false }),
            },
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
