import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { apiHelix } from 'src/api';
import { useCurrentUserScope } from 'src/scopes';

type UseChatActionsReturnType = {
    handleClearChat: VoidFunction;
}

export const useChatActions = (): UseChatActionsReturnType => {
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

    return {
        handleClearChat
    };
};