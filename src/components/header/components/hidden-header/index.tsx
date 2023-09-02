import { CollapseIcon } from 'src/icons';
import { ChannelViewers, IconHoverTip } from 'src/components/header/components';

type HiddenHeaderProps = {
    channelTitle: string;
    channelCategory: string;
    onShowHeader: VoidFunction;
}

export const HiddenHeader = ({ channelTitle, channelCategory, onShowHeader }: HiddenHeaderProps) => (
    <div className='flex justify-around items-center p-2 gap-2 border-b-2 border-gray-600'>
        <span className='text-white text-sm font-semibold truncate max-w-[300px]'>{channelTitle}</span>
        <span className='text-purple-400 text-sm font-semibold truncate max-w-[300px]'>{channelCategory}</span>
        <ChannelViewers />
        <IconHoverTip text='Expand' className='top-[40px] left-[-12px]'>
            <div className='pr-5 pb-[5px]'>
                <CollapseIcon className='rotate-180 w-8 h-8 text-white hover:cursor-pointer hover:text-gray-300' onClick={onShowHeader} />
            </div>
        </IconHoverTip>
    </div>
);