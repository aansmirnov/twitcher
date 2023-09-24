import { useCurrentUserScope } from 'src/scopes';
import { ChannelActions, HiddenHeader, UserInfoView } from './components';
import { useVisibilityState } from 'src/hooks';
import { Box, Divider, Flex, Spacer } from '@chakra-ui/react';

export const Header = () => {
    const { currentUser, currentUserChannelInfo } = useCurrentUserScope();
    const [isHeaderVisible, { show: showHeader, hide: hideHeader }] = useVisibilityState(true);

    if (!currentUser || !currentUserChannelInfo) {
        return null;
    }

    if (!isHeaderVisible) {
        return (
            <HiddenHeader
                onShowHeader={showHeader}
                channelTitle={currentUserChannelInfo.title}
                channelCategory={currentUserChannelInfo.game_name}
            />
        );
    }

    return (
        <Box>
            <Flex p={4}>
                <UserInfoView currentUser={currentUser} currentUserChannelInfo={currentUserChannelInfo} />
                <Spacer />
                <ChannelActions onHideHeader={hideHeader} currentUserChannelInfo={currentUserChannelInfo} />
            </Flex>
            <Divider />
        </Box>
    );
};
