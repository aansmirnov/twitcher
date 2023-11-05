type Image = {
    /**
     * A URL to the small version (28px x 28px) of the emote.
     */
    url_1x: string;
    /**
     * A URL to the medium version (56px x 56px) of the emote.
     */
    url_2x: string;
    /**
     * A URL to the large version (112px x 112px) of the emote.
     */
    url_4x: string;
};

export type Emote = {
    /**
     * An ID that identifies this emote.
     */
    id: string;
    /**
     * The name of the emote.
     */
    name: string;
    /**
     * The image URLs for the emote.
     * You should use the templated URL in the template field to fetch the image instead of using these URLs.
     */
    images: Image;
    /**
     * The subscriber tier at which the emote is unlocked.
     */
    tier: string;
    /**
     * The type of emote. The possible values are:
       - bitstier — A custom Bits tier emote.
       - follower — A custom follower emote.
       - subscriptions — A custom subscriber emote.
     */
    emote_type: string;
    /**
     * An ID that identifies the emote set that the emote belongs to.
     */
    emote_set_id: string;
    /**
     * The formats that the emote is available in.
        - animated — An animated GIF is available for this emote.
        - static — A static PNG file is available for this emote.
     */
    format: string[];
    /**
     * The sizes that the emote is available in.
        - 1.0 — A small version (28px x 28px) is available.
        - 2.0 — A medium version (56px x 56px) is available.
        - 3.0 — A large version (112px x 112px) is available.
     */
    scale: string[];
    /**
     * The background themes that the emote is available in. Possible themes are:
        - dark
        - light
     */
    theme_mode: string[];
};
