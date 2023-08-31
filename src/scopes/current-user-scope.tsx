import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import { useConfigScope } from 'src/scopes';
import { ChannelInformation, UpdateChannelInformation, User } from 'src/types';

type CurrentUserScopeProps = {
    children: React.ReactNode;
}

type CurrentUserScopeContextType = {
    loading: boolean;
    currentUser?: User;
    currentUserChannelInfo?: ChannelInformation;
    updateChannelInformation: (body: UpdateChannelInformation, callback: VoidFunction) => void;
}

const CurrentUserScopeContext = createContext<CurrentUserScopeContextType>({
    loading: false,
    currentUser: undefined,
    currentUserChannelInfo: undefined,
    updateChannelInformation: () => null
});

export const CurrentUserScope = ({ children }: CurrentUserScopeProps) => {
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentUserChannelInfo, setCurrentUserChanneInfo] = useState<ChannelInformation>();
    const { canSendRequests } = useConfigScope();

    const getCurrentUserChannelInfo = useCallback((userID: string) => {
        apiHelix.getChannelsInformation({ broadcaster_id: [userID] })
            .then(({ data }) => {
                const [channelInfo] = data;
                setCurrentUserChanneInfo(channelInfo);
            });
    }, []);
    const getCurrentUser = useCallback(() => {
        apiHelix.getUsers()
            .then(({ data }) => {
                const [user] = data;
                setCurrentUser(user);

                getCurrentUserChannelInfo(user.id);
            })
            .finally(() => setLoading(false));
    }, [getCurrentUserChannelInfo]);
    const updateChannelInformation = useCallback((body: UpdateChannelInformation, callback: VoidFunction) => {
        if (currentUser) {
            apiHelix.updateChannelInformation({
                broadcaster_id: currentUser.id,
                ...body
            }).then(() => {
                setCurrentUserChanneInfo((prev) => ({ ...prev as ChannelInformation, ...body }));
                callback();
            });
        }
    }, [currentUser]);

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
            currentUserChannelInfo,
            updateChannelInformation
        }}>
            {children}
        </CurrentUserScopeContext.Provider>
    );
};

export const useCurrentUserScope = () => useContext(CurrentUserScopeContext);