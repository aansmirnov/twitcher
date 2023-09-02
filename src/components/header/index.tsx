import { useCurrentUserScope } from 'src/scopes';
import { ChannelActions, HiddenHeader, UserInfoView } from './components';
import { useVisibilityState } from 'src/hooks';

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
        <div className='flex justify-between p-4 border-b-2 border-gray-600'>
            <UserInfoView currentUser={currentUser} currentUserChannelInfo={currentUserChannelInfo} />
            <ChannelActions onHideHeader={hideHeader} />
        </div>
    );
};
