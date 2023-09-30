import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { apiHelix } from 'src/api';
import { useChatSettingsStore, useCurrentUserStore } from 'src/stores';
import { ChatSettings, UpdateChatSettingsIn } from 'src/types';

type UseChatActionsReturnType = {
    getChatSettings: (userID: string) => void;
    handleClearChat: VoidFunction;
    handleUpdateChatSettings: (body: UpdateChatSettingsIn['body']) => void;
    chatSettings?: ChatSettings;
}

export const useChatActions = (): UseChatActionsReturnType => {
    const toast = useToast();
    const { currentUser } = useCurrentUserStore;
    const { chatSettings, getChatSettings, updateChatSettings } = useChatSettingsStore;

    const handleClearChat = useCallback(() => {
        if (!currentUser) {
            return;
        }

        apiHelix
            .clearChat({ broadcaster_id: currentUser.id, moderator_id: currentUser.id })
            .then(() => {
                toast({ description: 'Chat successfully cleared', duration: 1000, status: 'success' });
            });
    }, [currentUser, toast]);

    const handleUpdateChatSettings = useCallback((body: UpdateChatSettingsIn['body']) => {
        if (!currentUser) {
            return;
        }

        updateChatSettings(currentUser.id, body);
    }, [currentUser, updateChatSettings]);

    useEffect(() => {
        if (currentUser && !chatSettings) {
            getChatSettings(currentUser.id);
        }
    }, [chatSettings, currentUser, getChatSettings]);

    return {
        getChatSettings,
        handleClearChat,
        handleUpdateChatSettings,
        chatSettings,
    };
};