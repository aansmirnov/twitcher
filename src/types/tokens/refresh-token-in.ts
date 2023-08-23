import { GetAccessTokenIn } from './get-access-token-in';

/**
 * grant_type must be set to 'refresh_token'
 */
export type RefreshTokenIn = Omit<GetAccessTokenIn, 'code' | 'redirect_uri'> & {
    /**
     * The refresh token issued to the client
     */
    refresh_token: string;
};
