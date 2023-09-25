import { Box, Divider, Flex } from '@chakra-ui/react';
import { ChatActions, SendMessageForm } from './components';

export const Footer = () => {
    return (
        <Box>
            <Divider />
            <Flex gap={4} p={4} alignItems='center'>
                <ChatActions />
                <SendMessageForm />
            </Flex>
        </Box>
    );
};