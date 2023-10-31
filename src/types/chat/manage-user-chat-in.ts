import { DeleteChatMessageIn } from './delete-chat-message-in';

export type ManageUserChatIn = {
    /**
     * The ID of the user to add as a moderator in the broadcaster’s chat room.
     */
    user_id: string;
} & Pick<DeleteChatMessageIn, 'broadcaster_id'>