import { makeObservable, runInAction, observable, action } from 'mobx';
import { createContext, useContext } from 'react';
import { apiHelix } from 'src/api';
import { ChannelInformation, UpdateChannelInformationIn } from 'src/types';

class ChannelInformationStore {
    loading = false;
    channelInformation: ChannelInformation | undefined;

    constructor() {
        makeObservable(this, {
            loading: observable,
            channelInformation: observable,
            getChannelInformation: action,
            updateChannelInformation: action
        });
    }

    getChannelInformation = (userID: string) => {
        this.loading = true;

        apiHelix
            .getChannelsInformation({ broadcaster_id: [userID] })
            .then(({ data }) => {
                runInAction(() => {
                    const [channelInfo] = data;
                    this.channelInformation = channelInfo;
                });
            })
            .finally(() => {
                runInAction(() => {
                    this.loading = false;
                });
            });
    };

    updateChannelInformation = (body: UpdateChannelInformationIn, callback: VoidFunction) => {
        apiHelix
            .updateChannelInformation(body)
            .then(() => {
                runInAction(() => {
                    this.channelInformation = { ...this.channelInformation as ChannelInformation, ...body };
                });
                callback();
            });
    };
}

const context = createContext(new ChannelInformationStore());
export const useChannelInforamtionStoreContext = () => useContext(context);