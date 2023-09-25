import { useConfigScope, useCurrentUserScope } from 'src/scopes';
import {
    LoginWithTwitch,
    Header,
    CenteredWrapper,
    Footer
} from 'src/components';
import { Flex, Spinner } from '@chakra-ui/react';

export const TwitcherView = () => {
    const { loading: configLoading, config } = useConfigScope();
    const { loading: userLoading } = useCurrentUserScope();
    const isLoading = userLoading || configLoading;

    if (isLoading) {
        return (
            <CenteredWrapper>
                <Spinner size='xl' speed='0.65s' color='purple.500' p='4' />
            </CenteredWrapper>
        );
    }

    if (!isLoading && !config) {
        return (
            <CenteredWrapper>
                <LoginWithTwitch />
            </CenteredWrapper>
        );
    }

    return (
        <Flex height='inherit' flexDirection='column' justifyContent='space-between'>
            <Header />
            <Flex flexDirection='column' gap={8}>
                <div>chat</div>
                <Footer />
            </Flex>
        </Flex>
    );
};