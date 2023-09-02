import { UserIcon } from 'src/icons';

export const ChannelViewers = () => (
    <div className='flex items-center'>
        <UserIcon className='w-8 h-8 text-red-400 mt-2' />
        { /** TODO: Add real counter. */ }
        <span className='text-red-400'>999</span>
    </div>
);