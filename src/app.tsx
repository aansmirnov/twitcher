import { Box, ChakraProvider } from '@chakra-ui/react';
import { TwitcherView } from 'src/components';
import { ScopeComposer } from 'src/scopes';

export const App = () => {
    return (
        <ChakraProvider>
            <ScopeComposer>
                <Box bg='gray.800' w='100%' h='100vh'>
                    <TwitcherView />
                </Box>
            </ScopeComposer>
        </ChakraProvider>
    );
};
