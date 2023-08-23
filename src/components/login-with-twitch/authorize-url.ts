import { CLIENT_ID } from 'src/consts';

export const authorizeUrl = () => {
    let path = 'https://id.twitch.tv/oauth2/authorize';
    // Must be set to code
    path += '?response_type=code';
    // App registered client ID.
    path += `&client_id=${CLIENT_ID}`;
    // App registered redirect URI
    path += '&redirect_uri=http://localhost:3000';
    // A space-delimited list of scopes.
    // The APIs that you’re calling will identify the scopes you must list.
    // You must URL encode the list.
    const scope = encodeURIComponent([
        'openid',
        'moderator:manage:chat_settings',
        'moderator:manage:banned_users',
    ].join(' '));
    path += `&scope=${scope}`;

    return path;
};