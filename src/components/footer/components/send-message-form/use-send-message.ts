import { useCallback, useEffect, useState } from 'react';
import { useChatEventsStoreContext, useCurrentUserStore } from 'src/stores';
import { parseTwitchIrcMessage } from 'src/utils';

type UseSendMessageReturnType = {
    sendMessage: (message: string) => void;
}

export const useSendMessage = (): UseSendMessageReturnType => {
    const [isConnectionInitialized, setIsConnectionInitialized] = useState(false);
    const [websocket, setWebsockt] = useState<WebSocket>();
    const { createConnection, connectToChat } = useChatEventsStoreContext();
    const { currentUser } = useCurrentUserStore;

    const listenMessages = useCallback((socket: WebSocket) => {
        socket.onmessage = (event) => {
            const message = (event.data as string).split('\r\n').filter((it): it is string => it.length > 0);
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

    const sendMessage = (message: string) => {
        if (!websocket || !currentUser) {
            throw new Error('Failed to sent a message.');
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
    }, [connectToChat, createConnection, currentUser, isConnectionInitialized, listenMessages]);

    return {
        sendMessage
    };
};