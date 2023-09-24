import { Fragment } from 'react';
import { useConfigScope, useCurrentUserScope } from 'src/scopes';
import { LoginWithTwitch, Header } from 'src/components';
import { CenteredWrapper } from 'src/components';
import { Spinner } from '@chakra-ui/react';

export const TwitcherView = () => {
    const { loading: configLoading, config } = useConfigScope();
    const { loading: userLoading } = useCurrentUserScope();
    const isLoading = userLoading || configLoading;

    if (isLoading) {
        return (
            <CenteredWrapper>
                <Spinner size='xl' speed='0.65s' color='purple.500' p='4' />
            </CenteredWrapper>
        );
    }

    if (!isLoading && !config) {
        return (
            <CenteredWrapper>
                <LoginWithTwitch />
            </CenteredWrapper>
        );
    }

    return (
        <Fragment>
            <Header />
        </Fragment>
    );
};