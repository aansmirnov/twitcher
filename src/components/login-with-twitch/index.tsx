import { useEffect, useMemo } from 'react';
import { useConfigScope } from 'src/scopes';
import { TwitchIcon } from 'src/icons';
import { authorizeUrl } from './authorize-url';
import { Button } from 'src/components/ui';

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
        <Button size="xl" variant='primary' onClick={goToAuthPath} className='flex gap-2 items-center'>
            <TwitchIcon />
            Login with Twitch
        </Button>
    );
};