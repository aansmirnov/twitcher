import { ConfigScope } from './config-scope';

type ScopeComposerProps = {
    children: React.ReactNode;
}

export const ScopeComposer = ({ children }: ScopeComposerProps) => (
    <ConfigScope>
        { children }
    </ConfigScope>
);