import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useVisibilityState } from 'src/hooks';
import { useChatActions } from './use-chat-actions';
import { EditChatSettings } from './components';
import { observer } from 'mobx-react';

export const ChatActions = observer(() => {
    const { chatSettings, handleClearChat, handleUpdateChatSettings } =
        useChatActions();
    const [isVisible, { show, hide }] = useVisibilityState();
    const isPopupVisible = chatSettings && isVisible;

    return (
        <Fragment>
            <Flex gap={4}>
                <Tooltip
                    borderRadius='lg'
                    placement='top'
                    label='Chat Settings'
                >
                    <SettingsIcon
                        onClick={show}
                        color='white'
                        cursor='pointer'
                        _hover={{ color: 'gray.300' }}
                    />
                </Tooltip>
                <Tooltip borderRadius='lg' placement='top' label='Clear Chat'>
                    <DeleteIcon
                        color='white'
                        cursor='pointer'
                        _hover={{ color: 'gray.300' }}
                        onClick={handleClearChat}
                    />
                </Tooltip>
            </Flex>
            {isPopupVisible && (
                <EditChatSettings
                    handleUpdateChatSettings={handleUpdateChatSettings}
                    chatSettings={chatSettings}
                    onClose={hide}
                    isOpen={isVisible}
                />
            )}
        </Fragment>
    );
});
