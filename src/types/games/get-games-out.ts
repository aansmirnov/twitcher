import { Game } from './game';

export type GetGamesOut = {
    /**
     * The list of categories and games. The list is empty if the specified categories and games weren’t found.
     */
    data: Game[];
}