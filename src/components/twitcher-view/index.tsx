import { observer } from 'mobx-react';
import {
    LoginWithTwitch,
    Header,
    CenteredWrapper,
    Footer
} from 'src/components';
import { Flex, Spinner } from '@chakra-ui/react';
import { useChannelInformation, useCurrentUser, useTwitcherConfig } from 'src/hooks';

export const TwitcherView = observer(() => {
    const { loading: configLoading, config, getAccessToken } = useTwitcherConfig();
    const { loading: userLoading, currentUser } = useCurrentUser();
    const { loading: channelInfoLoading, channelInformation, updateChannelInformation } = useChannelInformation();
    const isLoading = userLoading || configLoading || channelInfoLoading;

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
                <LoginWithTwitch getAccessToken={getAccessToken} />
            </CenteredWrapper>
        );
    }

    if (!currentUser || !channelInformation) {
        return null;
    }

    return (
        <Flex height='inherit' flexDirection='column' justifyContent='space-between'>
            <Header
                currentUser={currentUser}
                channelInformation={channelInformation}
                updateChannelInformation={updateChannelInformation}
            />
            <Flex flexDirection='column' gap={8}>
                <div>chat</div>
                <Footer />
            </Flex>
        </Flex>
    );
});