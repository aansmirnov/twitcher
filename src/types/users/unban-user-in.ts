export type UnbanUserIn = {
    /**
     * The ID of the broadcaster whose chat room the user is banned from chatting in.
     */
    broadcaster_id: string;
    /**
     * The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room.
     */
    moderator_id: string;
    /**
     * The ID of the user to remove the ban or timeout from.
     */
    user_id: string;
};
