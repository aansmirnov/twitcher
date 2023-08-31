import { useConfigScope, useCurrentUserScope } from 'src/scopes';
import { CenteredWrapper, LoginWithTwitch, Header } from 'src/components';
import { Spinner } from 'src/components/ui';

export const TwitcherView = () => {
    const { loading: configLoading, config } = useConfigScope();
    const { loading: userLoading } = useCurrentUserScope();
    const isLoading = userLoading || configLoading;

    if (isLoading) {
        return (
            <CenteredWrapper>
                <Spinner />
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
        <div>
            <Header />
        </div>
    );
};