import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import { useCurrentUserScope } from 'src/scopes';
import { ChatSettings, UpdateChatSettingsIn } from 'src/types';

type UseChatActionsReturnType = {
    handleClearChat: VoidFunction;
    handleUpdateChatSettings: (body: UpdateChatSettingsIn['body']) => void;
    chatSettings?: ChatSettings;
}

export const useChatActions = (): UseChatActionsReturnType => {
    const [isSendRequest, setIsSendRequest] = useState(false);
    const [chatSettings, setChatSettings] = useState<ChatSettings>();
    const { currentUser } = useCurrentUserScope();
    const toast = useToast();
    const userID = currentUser?.id;

    const handleClearChat = useCallback(() => {
        if (!userID) {
            return;
        }

        apiHelix
            .clearChat({ broadcaster_id: userID, moderator_id: userID })
            .then(() => {
                toast({ description: 'Chat successfully cleared', duration: 1000, status: 'success' });
            });
    }, [userID, toast]);

    const handleUpdateChatSettings = useCallback((body: UpdateChatSettingsIn['body']) => {
        if (!userID) {
            return;
        }

        apiHelix
            .updateChatSettings({
                params: { broadcaster_id: userID, moderator_id: userID },
                body
            })
            .then(({ data }) => {
                setChatSettings(data[0]);
            })
            .catch(() => {
                toast({ description: 'Something went wrong :(', duration: 1000, status: 'error' });
            });
    }, [toast, userID]);

    useEffect(() => {
        if (!isSendRequest && userID) {
            apiHelix
                .getChatSettings({ broadcaster_id: userID })
                .then(({ data }) => {
                    if (data.length === 1) {
                        setChatSettings(data[0]);
                    }
                })
                .finally(() => setIsSendRequest(true));
        }
    }, [userID, isSendRequest]);

    return {
        handleClearChat,
        handleUpdateChatSettings,
        chatSettings,
    };
};