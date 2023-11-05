export type GetUsersIn = {
    /**
     * The ID of the user to get.
     * The maximum number of IDs you may specify is 100.
     */
    id?: string[];

    /**
     * The login name of the user to get.
     * The maximum number of login names you may specify is 100.
     */
    login?: string[];
};
