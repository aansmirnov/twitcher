export type Game = {
    /**
     * An ID that identifies the category or game.
     */
    id: string;
    /**
     * The category’s or game’s name
     */
    name: string;
    /**
     * A URL to the category’s or game’s box art. You must replace the {width}x{height} placeholder with the size of image you want.
     */
    box_art_url: string;
    /**
     * The ID that IGDB uses to identify this game. If the IGDB ID is not available to Twitch, this field is set to an empty string.
     */
    igdb_id: string;
}
