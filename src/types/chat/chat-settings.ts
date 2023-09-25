export type ChatSettings = {
    /**
     * The ID of the broadcaster specified in the request.
     */
    broadcaster_id: string;
    /**
     * A Boolean value that determines whether chat messages must contain only emotes.
     */
    emote_mode: boolean;
    /**
     * A Boolean value that determines whether the broadcaster restricts the chat room to followers only.
     */
    follower_mode: boolean;
    /**
     * The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room.
     */
    follower_mode_duration: number | null;
    /**
     * The moderator’s ID.
     */
    moderator_id: string;
    /**
     * A Boolean value that determines whether the broadcaster adds a short delay before chat messages appear in the chat room.
     */
    non_moderator_chat_delay: boolean;
    /**
     * The amount of time, in seconds, that messages are delayed before appearing in chat.
     */
    non_moderator_chat_delay_duration: number | null;
    /**
     * A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages.
     */
    slow_mode: boolean;
    /**
     * The amount of time, in seconds, that users must wait between sending messages.
     */
    slow_mode_wait_time: number | null;
    /**
     * A Boolean value that determines whether only users that subscribe to the broadcaster’s channel may talk in the chat room.
     */
    subscriber_mode: boolean;
    /**
     * A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.
     */
    unique_chat_mode: boolean;
}