export type GetGamesIn = {
    /**
     * The ID of the category or game to get. Include this parameter for each category or game you want to get.
     */
    id?: string[];
    /**
     * The name of the category or game to get. The name must exactly match the category’s or game’s title.
     */
    name?: string[];
    /**
     * The IGDB ID of the game to get. Include this parameter for each game you want to get.
     * https://www.igdb.com/
     */
    igdb_id?: string[];
}
