import { useCallback, useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import { useCurrentUserScope } from 'src/scopes';
import { ChannelInformation, UpdateChannelInformation } from 'src/types';

export type UseChannelInformationReturnType = {
    channelInformation?: ChannelInformation;
    updateChannelInformation: (body: UpdateChannelInformation, callback: VoidFunction) => void;
    loading: boolean;
}

export const useChannelInformation = (): UseChannelInformationReturnType => {
    const [channelInformation, setChannelInformation] = useState<ChannelInformation>();
    const [loading, setLoading] = useState(true);
    const { currentUser } = useCurrentUserScope();

    const getChannelInfo = useCallback((userID: string) => {
        apiHelix
            .getChannelsInformation({ broadcaster_id: [userID] })
            .then(({ data }) => {
                const [channelInfo] = data;

                setChannelInformation(channelInfo);
                setLoading(false);
            });
    }, []);

    const updateChannelInformation = (body: UpdateChannelInformation, callback: VoidFunction) => {
        if (currentUser) {
            apiHelix.updateChannelInformation({
                broadcaster_id: currentUser.id,
                ...body
            }).then(() => {
                setChannelInformation((prev) => ({ ...prev as ChannelInformation, ...body }));
                callback();
            });
        }
    };

    useEffect(() => {
        if (currentUser) {
            getChannelInfo(currentUser.id);
        }
    }, [currentUser, getChannelInfo]);


    return {
        channelInformation,
        updateChannelInformation,
        loading
    };
};