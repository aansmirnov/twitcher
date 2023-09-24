import { Fragment } from 'react';
import { ChannelViewers } from 'src/components/header/components';
import { useVisibilityState } from 'src/hooks';
import { EditPopup } from './components';
import { ChannelInformation } from 'src/types';
import { EditIcon, UpDownIcon } from '@chakra-ui/icons';
import { Flex, Tooltip } from '@chakra-ui/react';

type ChannelActionsProps = {
    onHideHeader: VoidFunction;
    currentUserChannelInfo: ChannelInformation;
}

export const ChannelActions = ({ onHideHeader, currentUserChannelInfo }: ChannelActionsProps) => {
    const [isEditPopupVisible, { show, hide }] = useVisibilityState();

    return (
        <Fragment>
            <Flex flexDirection='column' justifyContent='space-around'>
                <ChannelViewers />
                <Flex alignItems='center' gap={4}>
                    <Tooltip borderRadius='lg' placement='bottom' label='Edit'>
                        <EditIcon cursor='pointer' _hover={{ color: 'gray.300' }} color='white' onClick={show} />
                    </Tooltip>
                    <Tooltip borderRadius='lg' placement='bottom' label='Hide'>
                        <UpDownIcon cursor='pointer' _hover={{ color: 'gray.300' }} color='white' onClick={onHideHeader} />
                    </Tooltip>
                </Flex>
            </Flex>
            { isEditPopupVisible && <EditPopup isOpen={isEditPopupVisible} currentUserChannelInfo={currentUserChannelInfo} onClose={hide} />}
        </Fragment>
    );
};