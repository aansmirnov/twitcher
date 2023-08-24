import { ConfigScope } from './config-scope';
import { CurrentUserScope } from './current-user-scope';

type ScopeComposerProps = {
    children: React.ReactNode;
}

export const ScopeComposer = ({ children }: ScopeComposerProps) => (
    <ConfigScope>
        <CurrentUserScope>
            { children }
        </CurrentUserScope>
    </ConfigScope>
);