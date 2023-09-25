import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';
import { useChatActions } from './use-chat-actions';

export const ChatActions = () => {
    const { handleClearChat } = useChatActions();

    return (
        <Flex gap={4}>
            <Tooltip borderRadius='lg' placement='top' label='Clear Chat'>
                <DeleteIcon color='white' cursor='pointer' _hover={{ color: 'gray.300' }} onClick={handleClearChat} />
            </Tooltip>
            <Tooltip borderRadius='lg' placement='top' label='Chat Settings'>
                <SettingsIcon color='white' cursor='pointer' _hover={{ color: 'gray.300' }} />
            </Tooltip>
        </Flex>
    );
};