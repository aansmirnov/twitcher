import { useCallback, useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import {
    useChatEventsStoreContext,
    useCurrentUserStoreContext,
} from 'src/stores';
import { parseTwitchIrcMessage } from 'src/utils';
import {
    BAN_COMMAND,
    COMMANDS_MAP,
    MOD_COMMAND,
    UNBAN_COMMAND,
    UNMOD_COMMAND,
    UNVIP_COMMAND,
    VIP_COMMAND,
} from './consts';
import { User } from 'src/types';
import { useChat } from 'src/components/chat-messages/use-chat';

type UseSendMessageReturnType = {
    sendMessage: (message: string) => void;
};

export const useSendMessage = (): UseSendMessageReturnType => {
    const [isConnectionInitialized, setIsConnectionInitialized] =
        useState(false);
    const [websocket, setWebsockt] = useState<WebSocket>();
    const { createConnection, connectToChat } = useChatEventsStoreContext();
    const { currentUser } = useCurrentUserStoreContext();
    const { banUser, toggleUserMod, unbanUser } = useChat();

    const listenMessages = useCallback((socket: WebSocket) => {
        socket.onmessage = (event) => {
            const message = (event.data as string)
                .split('\r\n')
                .filter((it): it is string => it.length > 0);
            message.forEach((it) => {
                const parsedMessage = parseTwitchIrcMessage(it);

                if (!parsedMessage) {
                    return;
                }

                if (parsedMessage.command?.command === 'PING') {
                    socket.send(`PONG ${parsedMessage.parameters}`);
                }
            });
        };
    }, []);

    const getUser = (userLogin: string) => {
        return apiHelix.getUsers({ login: [userLogin] });
    };

    const actionOnUser = (command: string, user: User) => {
        const userID = user.id;
        const userName = user.display_name;

        switch (command) {
            case BAN_COMMAND: {
                banUser({ user_id: userID }, userName);
                break;
            }
            case UNBAN_COMMAND: {
                unbanUser(userID, userName);
                break;
            }
            case MOD_COMMAND:
            case UNMOD_COMMAND: {
                toggleUserMod(userID, command === UNMOD_COMMAND, userName);
                break;
            }
            case VIP_COMMAND:
            case UNVIP_COMMAND: {
                toggleUserMod(userID, command === UNVIP_COMMAND, userName);
                break;
            }
            default:
                break;
        }
    };

    const sendMessage = async (message: string) => {
        if (!websocket || !currentUser) {
            throw new Error('Failed to sent a message.');
        }

        const [command, userLogin] = message.split(' ');

        if (COMMANDS_MAP[command] && userLogin) {
            const { data = [] } = await getUser(userLogin);
            const [user] = data;

            if (user) {
                actionOnUser(COMMANDS_MAP[command], user);
            }
            return;
        }

        websocket.send(`PRIVMSG #${currentUser.login} :${message}`);
    };

    useEffect(() => {
        if (currentUser && !isConnectionInitialized) {
            const socket = createConnection(currentUser.login);

            socket.onopen = () => {
                setWebsockt(socket);
                setIsConnectionInitialized(true);
                connectToChat(socket);
            };

            listenMessages(socket);
        }
    }, [
        connectToChat,
        createConnection,
        currentUser,
        isConnectionInitialized,
        listenMessages,
    ]);

    return {
        sendMessage,
    };
};
