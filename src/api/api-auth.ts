import axios from 'axios';
import { Config, GetAccessTokenIn, RefreshTokenIn } from 'src/types';
import { ApiRequest } from './api-request';
import { TWITCH_TOKEN_URL } from 'src/consts';

interface IApiAuth {
    getAccessToken(body: GetAccessTokenIn): Promise<Config>;
    refreshToken(body: RefreshTokenIn): Promise<Config>;
}

class ApiAuth extends ApiRequest implements IApiAuth {
    getAccessToken(body: GetAccessTokenIn): Promise<Config> {
        return this.provider.post('', body);
    }

    refreshToken(body: RefreshTokenIn): Promise<Config> {
        return this.provider.post('', body);
    }
}

export const apiAuth = new ApiAuth(
    axios.create({
        baseURL: TWITCH_TOKEN_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }),
);
