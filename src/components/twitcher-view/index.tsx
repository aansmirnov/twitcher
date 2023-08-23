import { useConfigScope } from 'src/scopes';
import { CenteredWrapper, LoginWithTwitch, Spinner } from 'src/components';

export const TwitcherView = () => {
    const { loading, config } = useConfigScope();

    if (loading) {
        return (
            <CenteredWrapper>
                <Spinner />
            </CenteredWrapper>
        );
    }

    if (!loading && !config) {
        return (
            <CenteredWrapper>
                <LoginWithTwitch />
            </CenteredWrapper>
        );
    }

    return (
        <div>auth done</div>
    );
};