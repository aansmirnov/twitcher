import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import { useConfigScope } from 'src/scopes';
import { User } from 'src/types';

type CurrentUserScopeProps = {
    children: React.ReactNode;
}

type CurrentUserScopeContextType = {
    loading: boolean;
    currentUser?: User;
}

const CurrentUserScopeContext = createContext<CurrentUserScopeContextType>({
    loading: false,
    currentUser: undefined,
});

export const CurrentUserScope = ({ children }: CurrentUserScopeProps) => {
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>();
    const { canSendRequests } = useConfigScope();

    const getCurrentUser = useCallback(() => {
        apiHelix.getUsers()
            .then(({ data }) => {
                const [user] = data;
                setCurrentUser(user);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (canSendRequests) {
            setLoading(true);
            getCurrentUser();
        }
    }, [canSendRequests, getCurrentUser]);

    return (
        <CurrentUserScopeContext.Provider value={{
            loading,
            currentUser,
        }}>
            {children}
        </CurrentUserScopeContext.Provider>
    );
};

export const useCurrentUserScope = () => useContext(CurrentUserScopeContext);