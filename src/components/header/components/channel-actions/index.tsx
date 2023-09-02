import { CollapseIcon, EditIcon } from 'src/icons';
import { IconHoverTip, ChannelViewers } from 'src/components/header/components';

type ChannelActionsProps = {
    onHideHeader: VoidFunction;
}

export const ChannelActions = ({ onHideHeader }: ChannelActionsProps) => {
    return (
        <div className="flex flex-col justify-center gap-3 w-[65px]">
            <ChannelViewers />
            <div className='flex'>
                <IconHoverTip text='Edit'>
                    <EditIcon className='w-8 h-8 text-white hover:cursor-pointer hover:text-gray-300' />
                </IconHoverTip>
                <IconHoverTip text='Hide'>
                    <CollapseIcon className='w-8 h-8 text-white hover:cursor-pointer hover:text-gray-300' onClick={onHideHeader} />
                </IconHoverTip>
            </div>
        </div>
    );
};