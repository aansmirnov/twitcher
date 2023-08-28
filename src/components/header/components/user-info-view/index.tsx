import { VerifiedPartnerIcon } from 'src/icons';
import { ChannelInformation, User } from 'src/types';

type UserInfoViewProps = {
    currentUser: User;
    currentUserChannelInfo: ChannelInformation;
}

export const UserInfoView = ({ currentUser, currentUserChannelInfo }: UserInfoViewProps) => {
    const { profile_image_url, display_name, broadcaster_type } = currentUser;
    const { tags, title, game_name } = currentUserChannelInfo;
    const hasTags = tags.length > 0;

    return (
        <div className='flex gap-3'>
            {/** TODO: When stream goes live, change ring color to accent. */}
            <img className='h-16 w-16 rounded-full ring-2 ring-gray-500 mt-[8px]' src={profile_image_url} alt={display_name} />
            <div className='flex flex-col'>
                <div className='flex gap-1 mb-2 items-center'>
                    <h1 className='text-xl text-white font-semibold '>{display_name}</h1>
                    { broadcaster_type === 'partner' && <VerifiedPartnerIcon /> }
                </div>
                <div className='flex flex-col'>
                    <h2 className='w-fit text-sm text-white font-semibold cursor-pointer hover:text-gray-300'>{title}</h2>
                    <span className='text-sm text-purple-400 cursor-pointer hover:text-purple-500'>{game_name}</span>
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
    );
};
