import { Fragment } from 'react';
import { useVisibilityState } from 'src/hooks';
import { VerifiedPartnerIcon } from 'src/icons';
import { ChannelInformation, UpdateChannelInformation, User } from 'src/types';
import { EditCategoryPopup, EditTitlePopup } from './components';
import { useCurrentUserScope } from 'src/scopes';

type UserInfoViewProps = {
    currentUser: User;
    currentUserChannelInfo: ChannelInformation;
}

export const UserInfoView = ({ currentUser, currentUserChannelInfo }: UserInfoViewProps) => {
    const { profile_image_url, display_name, broadcaster_type } = currentUser;
    const { tags, title, game_name } = currentUserChannelInfo;
    const hasTags = tags.length > 0;

    const [isEditTitlePopupVisible, { show: showEditTitlePopup, hide: hideEditTitlePopup }] = useVisibilityState();
    const [isEditCategoryPopupVisible, { show: showEditCategoryPopup, hide: hideEditCategoryPopup }] = useVisibilityState();
    const { updateChannelInformation } = useCurrentUserScope();

    const handleUpdateChannel = (body: UpdateChannelInformation, callback: VoidFunction) => {
        updateChannelInformation(body, callback);
    };

    return (
        <Fragment>
            <div className='flex gap-3 w-full'>
                {/** TODO: When stream goes live, change ring color to accent. */}
                <img className='h-16 w-16 rounded-full ring-2 ring-gray-500 mt-[8px]' src={profile_image_url} alt={display_name} />
                <div className='flex flex-col'>
                    <div className='flex gap-1 mb-2 items-center'>
                        <h1 className='text-xl text-white font-semibold '>{display_name}</h1>
                        { broadcaster_type === 'partner' && <VerifiedPartnerIcon /> }
                    </div>
                    <div className='flex flex-col'>
                        <h2 onClick={showEditTitlePopup} className='w-fit text-sm text-white font-semibold cursor-pointer hover:text-gray-300'>{title}</h2>
                        <span onClick={showEditCategoryPopup} className='text-sm text-purple-400 cursor-pointer hover:text-purple-500'>{game_name}</span>
                        { hasTags && (
                            <div className='flex flex-wrap gap-1 mt-2'>
                                { tags.map((tag) => (
                                    <span key={tag} className='text-xs font-semibold text-gray-300 px-2 py-1 bg-zinc-700 rounded-full'>{tag}</span>
                                ))}
                            </div>
                        ) }
                    </div>
                </div>
            </div>
            { isEditTitlePopupVisible && <EditTitlePopup onSave={handleUpdateChannel} title={title} onClose={hideEditTitlePopup} /> }
            { isEditCategoryPopupVisible && <EditCategoryPopup onSave={handleUpdateChannel} categoryName={game_name} onClose={hideEditCategoryPopup} /> }
        </Fragment>
    );
};
