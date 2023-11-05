export type ClearChatIn = {
    /**
     * The ID of the broadcaster that owns the chat room to remove messages from.
     */
    broadcaster_id: string;
    /**
     * The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room.
     * This ID must match the user ID in the user access token.
     */
    moderator_id: string;
    /**
     * The ID of the message to remove.
     */
    message_id?: string;
};
