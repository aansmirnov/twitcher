import { StreamType } from './stream-type';

export type GetStreamIn = {
    /**
     * A user ID used to filter the list of streams.
     */
    user_id?: string[];
    /**
     * A user login name used to filter the list of streams.
     */
    user_login?: string[];
    /**
     * A game (category) ID used to filter the list of streams.
     */
    game_id?: string[];
    /**
     * The type of stream to filter the list of streams by.
     */
    type?: StreamType;
    /**
     * A language code used to filter the list of streams.
     */
    language?: string;
    /**
     * The maximum number of items to return per page in the response.
       The minimum page size is 1 item per page and the maximum is 100 items per page.
       The default is 20.
     */
    first?: number;
    /**
     * The cursor used to get the previous page of results.
     */
    before?: string;
    /**
     * The cursor used to get the next page of results.
     */
    after?: string;
};
