import { useEffect, useMemo } from 'react';
import { authorizeUrl } from './authorize-url';
import { Button, Text } from '@chakra-ui/react';
import { TwitchIcon } from 'src/icons';

type LoginWithTwitchProps = {
    getAccessToken: (authCode: string) => void;
};

export const LoginWithTwitch = ({ getAccessToken }: LoginWithTwitchProps) => {
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
        <Button colorScheme='purple' onClick={goToAuthPath}>
            <TwitchIcon mr={2} color='white' />
            <Text color='white'>Login with Twitch</Text>
        </Button>
    );
};
