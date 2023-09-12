import { CollapseIcon, EditIcon } from 'src/icons';
import { IconHoverTip, ChannelViewers } from 'src/components/header/components';
import { useVisibilityState } from 'src/hooks';
import { Fragment } from 'react';
import { EditPopup } from './components';
import { ChannelInformation } from 'src/types';

type ChannelActionsProps = {
    onHideHeader: VoidFunction;
    currentUserChannelInfo: ChannelInformation;
}

export const ChannelActions = ({ onHideHeader, currentUserChannelInfo }: ChannelActionsProps) => {
    const [isEditPopupVisible, { show, hide }] = useVisibilityState();
    return (
        <Fragment>
            <div className="flex flex-col justify-center gap-3 w-[65px]">
                <ChannelViewers />
                <div className='flex'>
                    <IconHoverTip text='Edit'>
                        <EditIcon onClick={show} className='w-8 h-8 text-white hover:cursor-pointer hover:text-gray-300' />
                    </IconHoverTip>
                    <IconHoverTip text='Hide'>
                        <CollapseIcon className='w-8 h-8 text-white hover:cursor-pointer hover:text-gray-300' onClick={onHideHeader} />
                    </IconHoverTip>
                </div>
            </div>

            { isEditPopupVisible && <EditPopup currentUserChannelInfo={currentUserChannelInfo} onClose={hide} /> }
        </Fragment>
    );
};