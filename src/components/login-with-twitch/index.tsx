import { useEffect, useMemo } from 'react';
import { useConfigScope } from 'src/scopes';
import { TwitchIcon } from 'src/icons';
import { authorizeUrl } from './authorize-url';

export const LoginWithTwitch = () => {
    const { getAccessToken } = useConfigScope();
    const queryCode = useMemo(() => {
        const url = new URL(window.location.href);
        return url.searchParams.get('code');
    }, []);

    const goToAuthPath = () => {
        const path = authorizeUrl();
        window.open(path, '_self');
    };

    useEffect(() => {
        if (queryCode) {
            getAccessToken(queryCode);
        }
    }, [getAccessToken, queryCode]);

    return (
        <section>
            <button
                onClick={goToAuthPath}
                className='flex gap-2 items-center text-white bg-purple-500 p-4 rounded-xl transition duration-120 ease-out hover:ease-in hover:bg-purple-400'
            >
                <TwitchIcon />
                Login with Twitch
            </button>
        </section>
    );
};