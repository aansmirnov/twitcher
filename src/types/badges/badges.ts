export type Versions = {
    /**
     * An ID that identifies this version of the badge.
     */
    id: string;
    /**
     * A URL to the small version (18px x 18px) of the badge.
     */
    image_url_1x: string;
    /**
     * A URL to the medium version (36px x 36px) of the badge.
     */
    image_url_2x: string;
    /**
     * A URL to the large version (72px x 72px) of the badge.
     */
    image_url_4x: string;
    /**
     * The title of the badge.
     */
    title: string;
    /**
     * The description of the badge.
     */
    description: string;
};

export type Badges = {
    /**
     * An ID that identifies this set of chat badges. For example, Bits or Subscriber.
     */
    set_id: string;
    /**
     * The list of chat badges in this set.
     */
    versions: Versions[];
};
