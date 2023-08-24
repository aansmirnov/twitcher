export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET as string;
export const AUTH_TOKEN = JSON.parse(localStorage.getItem('twitcher_config') as string)?.access_token as string | undefined;