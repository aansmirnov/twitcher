export type GetUsersOut = {
    /**
     * An ID that identifies the user.
     */
    id: string;
    /**
     * The user’s login name.
     */
    login: string;
    /**
     * The user’s display name.
     */
    display_name: string;
    /**
     * The type of user. Possible values are:
        admin — Twitch administrator
        global_mod
        staff — Twitch staff
        "" — Normal user
     */
    type: string;
    /**
     * The type of broadcaster. Possible values are:
        affiliate — An affiliate broadcaster
        partner — A partner broadcaster
        "" — A normal broadcaster
     */
    broadcaster_type: string;
    /**
     * The user’s description of their channel.
     */
    description: string;
    /**
     * A URL to the user’s profile image.
     */
    profile_image_url: string;
    /**
     * A URL to the user’s offline image.
     */
    offline_image_url: string;
    /**
     * The number of times the user’s channel has been viewed.
     */
    view_count: number;
    /**
     * The user’s verified email address.
     */
    email?: string;
    /**
     * The UTC date and time that the user’s account was created.
     * The timestamp is in RFC3339 format.
     */
    created_at: string;
}