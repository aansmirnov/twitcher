import { Box, Divider } from '@chakra-ui/react';
import { ChatActions } from './components';

export const Footer = () => {
    return (
        <Box>
            <Divider />
            <ChatActions />
        </Box>
    );
};