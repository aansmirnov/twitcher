import axios from 'axios';
import { GetUsersOut, GetUsersIn } from 'src/types';
import { ApiRequest } from './api-request';
import { AUTH_TOKEN, CLIENT_ID, TWITCH_HELIX_URL } from 'src/consts';

interface IApiUsers {
    getUsers(params: GetUsersIn): Promise<GetUsersOut[]>;
}

class ApiUsers extends ApiRequest implements IApiUsers {
    getUsers(params: GetUsersIn): Promise<GetUsersOut[]> {
        return this.provider.get('/users', { params });
    }
}

export const apiUsers = new ApiUsers(
    axios.create({
        baseURL: TWITCH_HELIX_URL,
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Client-Id': CLIENT_ID
        }
    })
);