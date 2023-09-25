import axios from 'axios';
import {
    GetUsersOut,
    GetUsersIn,
    GetChannelsInformationIn,
    GetChannelsInformationOut,
    UpdateChannelInformationIn,
    GetCategoriesIn,
    GetCategoriesOut,
    ClearChatIn
} from 'src/types';
import { ApiRequest } from './api-request';
import { AUTH_TOKEN, CLIENT_ID, TWITCH_HELIX_URL } from 'src/consts';

interface IApiHelix {
    getUsers(params?: GetUsersIn): Promise<GetUsersOut>;
    getChannelsInformation(params: GetChannelsInformationIn): Promise<GetChannelsInformationOut>;
    updateChannelInformation(params: UpdateChannelInformationIn): Promise<void>;
    getCategories(params: GetCategoriesIn): Promise<GetCategoriesOut>;
    clearChat(params: ClearChatIn): Promise<void>;
}

class ApiHelix extends ApiRequest implements IApiHelix {
    getUsers(params?: GetUsersIn): Promise<GetUsersOut> {
        return this.provider.get('/users', { params });
    }

    getChannelsInformation(params: GetChannelsInformationIn): Promise<GetChannelsInformationOut> {
        return this.provider.get('/channels', { params });
    }

    updateChannelInformation(params: UpdateChannelInformationIn): Promise<void> {
        const { broadcaster_id, ...body } = params;
        return this.provider.patch('/channels', body, { params: { broadcaster_id } } );
    }

    getCategories(params: GetCategoriesIn): Promise<GetCategoriesOut> {
        return this.provider.get('/search/categories', { params });
    }

    clearChat(params: ClearChatIn): Promise<void> {
        return this.provider.delete('/moderation/chat', { params });
    }
}

export const apiHelix = new ApiHelix(
    axios.create({
        baseURL: TWITCH_HELIX_URL,
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Client-Id': CLIENT_ID,
            'Content-Type': 'application/json'
        }
    })
);