export type GetCategoriesIn = {
    /**
     * Search string.
     */
    query: string;
    /**
     * The maximum number of items to return per page in the response.
     * The minimum page size is 1 item per page and the maximum is 100 items per page.
     * The default is 20.
     */
    first?: number;
    /**
     * The cursor used to get the next page of results.
     * The Pagination object in the response contains the cursor’s value.
     * https://dev.twitch.tv/docs/api/guide/#pagination
     */
    after?: string;
}