export type GetAccessTokenIn = {
    /**
     * App registered client ID
     */
    client_id: string;
    /**
     * App registered client secret
     */
    client_secret: string;
    /**
     * The code that the /authorize response returned in the code query parameter
     */
    code: string;
    /**
     * Must be set to authorization_code
     */
    grant_type: string;
    /**
     * App registered redirect URI
     */
    redirect_uri: string;
}