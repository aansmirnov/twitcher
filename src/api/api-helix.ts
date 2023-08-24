import axios from 'axios';
import { GetUsersOut, GetUsersIn, GetChannelsInformationIn, GetChannelsInformationOut } from 'src/types';
import { ApiRequest } from './api-request';
import { AUTH_TOKEN, CLIENT_ID, TWITCH_HELIX_URL } from 'src/consts';

interface IApiHelix {
    getUsers(params?: GetUsersIn): Promise<GetUsersOut>;
    getChannelsInformation(params: GetChannelsInformationIn): Promise<GetChannelsInformationOut>;
}

class ApiHelix extends ApiRequest implements IApiHelix {
    getUsers(params?: GetUsersIn): Promise<GetUsersOut> {
        return this.provider.get('/users', { params });
    }

    getChannelsInformation(params: GetChannelsInformationIn): Promise<GetChannelsInformationOut> {
        return this.provider.get('/channels', { params });
    }
}

export const apiHelix = new ApiHelix(
    axios.create({
        baseURL: TWITCH_HELIX_URL,
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Client-Id': CLIENT_ID
        }
    })
);