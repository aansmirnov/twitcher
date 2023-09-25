import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import { useCurrentUserScope } from 'src/scopes';
import { ChatSettings } from 'src/types';

type UseChatActionsReturnType = {
    handleClearChat: VoidFunction;
    chatSettings?: ChatSettings;
}

export const useChatActions = (): UseChatActionsReturnType => {
    const [isSendRequest, setIsSendRequest] = useState(false);
    const [chatSettings, setChatSettings] = useState<ChatSettings>();
    const { currentUser } = useCurrentUserScope();
    const toast = useToast();

    const handleClearChat = useCallback(() => {
        if (!currentUser) {
            return;
        }

        apiHelix
            .clearChat({ broadcaster_id: currentUser.id, moderator_id: currentUser.id })
            .then(() => {
                toast({ description: 'Chat successfully cleared', duration: 800, status: 'success' });
            });
    }, [currentUser, toast]);

    useEffect(() => {
        if (!isSendRequest && currentUser) {
            apiHelix
                .getChatSettings({ broadcaster_id: currentUser.id })
                .then(({ data }) => {
                    if (data.length === 1) {
                        setChatSettings(data[0]);
                    }
                })
                .finally(() => setIsSendRequest(true));
        }
    }, [currentUser, isSendRequest]);

    return {
        handleClearChat,
        chatSettings
    };
};