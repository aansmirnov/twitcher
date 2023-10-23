import { DeleteChatIn } from './delete-chat-in';

export type ManageUserChatIn = {
    /**
     * The ID of the user to add as a moderator in the broadcaster’s chat room.
     */
    user_id: string;
} & Pick<DeleteChatIn, 'broadcaster_id'>