import { CollapseIcon, EditIcon, UserIcon } from 'src/icons';

export const ChanngelActions = () => {
    return (
        <div className="flex flex-col justify-center gap-3 w-[65px]">
            <div className='flex'>
                <UserIcon />
                { /** TODO: Add real counter. */ }
                <span className='text-red-400'>999</span>
            </div>
            <div className='flex'>
                <EditIcon />
                <CollapseIcon />
            </div>
        </div>
    );
};