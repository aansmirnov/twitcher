import { ChannelActions, HiddenHeader, UserInfoView } from './components';
import { UseChannelInformationReturnType, useVisibilityState } from 'src/hooks';
import { Box, Divider, Flex, Spacer } from '@chakra-ui/react';
import { ChannelInformation, User } from 'src/types';
import { useHeader } from './use-header';
import { observer } from 'mobx-react';

type HeaderProps = {
    currentUser: User;
    channelInformation: ChannelInformation;
} & Pick<UseChannelInformationReturnType, 'updateChannelInformation'>;

export const Header = observer(
    ({
        currentUser,
        channelInformation,
        updateChannelInformation,
    }: HeaderProps) => {
        const [isHeaderVisible, { show: showHeader, hide: hideHeader }] =
            useVisibilityState(true);
        useHeader();

        if (!isHeaderVisible) {
            return (
                <HiddenHeader
                    onShowHeader={showHeader}
                    channelTitle={channelInformation.title}
                    channelCategory={channelInformation.game_name}
                />
            );
        }

        return (
            <Box>
                <Flex p={4}>
                    <UserInfoView
                        currentUser={currentUser}
                        updateChannelInformation={updateChannelInformation}
                        currentUserChannelInfo={channelInformation}
                    />
                    <Spacer />
                    <ChannelActions
                        updateChannelInformation={updateChannelInformation}
                        onHideHeader={hideHeader}
                        currentUserChannelInfo={channelInformation}
                    />
                </Flex>
                <Divider />
            </Box>
        );
    },
);
