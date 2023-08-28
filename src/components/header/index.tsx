import { useCurrentUserScope } from 'src/scopes';
import { ChanngelActions, UserInfoView } from './components';

export const Header = () => {
    const { currentUser, currentUserChannelInfo } = useCurrentUserScope();

    if (!currentUser || !currentUserChannelInfo) {
        return null;
    }

    return (
        <div className='flex justify-between p-4 border-b-2 border-gray-600'>
            <UserInfoView currentUser={currentUser} currentUserChannelInfo={currentUserChannelInfo} />
            <ChanngelActions />
        </div>
    );
};
