export type BanUserRequestBody = {
    /**
     * The ID of the user to ban or put in a timeout.
     */
    user_id: string;
    /**
     * To ban a user indefinitely, don’t include this field.
     */
    duration?: number;
    /**
     * The reason the you’re banning the user or putting them in a timeout.
     * The text is user defined and is limited to a maximum of 500 characters.
     */
    reason?: string;
};

type BanUserQuery = {
    /**
     * The ID of the broadcaster whose chat room the user is being banned from.
     */
    broadcaster_id: string;
    /**
     * The ID of the broadcaster or a user that has permission to moderate the broadcaster’s chat room.
     */
    moderator_id: string;
};

export type BanUserIn = {
    data: BanUserRequestBody;
    params: BanUserQuery;
};
