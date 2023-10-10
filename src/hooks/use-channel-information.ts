import { useEffect } from 'react';
import { ChannelInformation, UpdateChannelInformationIn } from 'src/types';
import { useCurrentUserStoreContext, useChannelInforamtionStoreContext } from 'src/stores';

export type UseChannelInformationReturnType = {
    updateChannelInformation: (body: UpdateChannelInformationIn, callback: VoidFunction) => void;
    channelInformation?: ChannelInformation;
    loading: boolean;
}

export const useChannelInformation = (): UseChannelInformationReturnType => {
    const { currentUser } = useCurrentUserStoreContext();
    const { getChannelInformation, loading, channelInformation, updateChannelInformation } = useChannelInforamtionStoreContext();

    const updateChannelInfo = (body: UpdateChannelInformationIn, callback: VoidFunction) => {
        if (currentUser) {
            updateChannelInformation({ ...body, broadcaster_id: currentUser.id }, callback);
        }
    };

    useEffect(() => {
        if (currentUser && !channelInformation) {
            getChannelInformation(currentUser.id);
        }
    },[channelInformation, currentUser, getChannelInformation]);

    return {
        updateChannelInformation: updateChannelInfo,
        channelInformation,
        loading
    };
};
