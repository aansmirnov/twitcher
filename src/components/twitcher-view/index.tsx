import { observer } from 'mobx-react';
import {
    LoginWithTwitch,
    Header,
    CenteredWrapper,
    Footer,
    ChatMessages,
} from 'src/components';
import { Flex, Spinner } from '@chakra-ui/react';
import { useTwitcherConfigStoreContext } from 'src/stores';
import { useChannelInformation, useChatEvents } from 'src/hooks';

export const TwitcherView = observer(() => {
    const {
        loading: configLoading,
        config,
        getAccessToken,
        currentUser,
    } = useTwitcherConfigStoreContext();
    const {
        loading: channelInfoLoading,
        channelInformation,
        updateChannelInformation,
    } = useChannelInformation();
    const { loading: chatEventsLoading } = useChatEvents();
    const isLoading = configLoading || channelInfoLoading || chatEventsLoading;

    if (isLoading) {
        return (
            <CenteredWrapper>
                <Spinner size='xl' speed='0.65s' color='purple.500' p='4' />
            </CenteredWrapper>
        );
    }

    if (!config && !isLoading) {
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
        <Flex
            height='inherit'
            flexDirection='column'
            justifyContent='space-between'
        >
            <Header
                currentUser={currentUser}
                channelInformation={channelInformation}
                updateChannelInformation={updateChannelInformation}
            />
            <ChatMessages />
            <Footer />
        </Flex>
    );
});
