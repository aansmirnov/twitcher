export type ChannelInformation = {
    /**
     * An ID that uniquely identifies the broadcaster.
     */
    broadcaster_id: string;
    /**
     * The broadcaster’s login name.
     */
    broadcaster_login: string;
    /**
     * The broadcaster’s display name.
     */
    broadcaster_name: string;
    /**
     * The broadcaster’s preferred language.
     */
    broadcaster_language: string;
    /**
     * The name of the game that the broadcaster is playing or last played.
     */
    game_name: string;
    /**
     * An ID that uniquely identifies the game that the broadcaster is playing or last played.
     */
    game_id: string;
    /**
     * The title of the stream that the broadcaster is currently streaming or last streamed.
     */
    title: string;
    /**
     * The value of the broadcaster’s stream delay setting, in seconds.
     */
    delay: number;
    /**
     * The tags applied to the channel.
     */
    tags: string[];
    /**
     * The CCLs applied to the channel.
     */
    content_classification_labels: string[];
    /**
     * Boolean flag indicating if the channel has branded content.
     */
    is_branded_content: boolean;
}