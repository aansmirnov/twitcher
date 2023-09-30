import { Box, ChakraProvider } from '@chakra-ui/react';
import { TwitcherView } from 'src/components';

export const App = () => {
    return (
        <ChakraProvider>
            <Box bg='gray.800' w='100%' h='100vh'>
                <TwitcherView />
            </Box>
        </ChakraProvider>
    );
};
