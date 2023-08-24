import { TwitcherView } from 'src/components';
import { ScopeComposer } from 'src/scopes';

export const App = () => {
    return (
        <div className="bg-gray-800 h-screen">
            <ScopeComposer>
                <TwitcherView />
            </ScopeComposer>
        </div>
    );
};
