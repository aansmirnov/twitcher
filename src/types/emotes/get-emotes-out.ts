import { Result } from '../result';
import { Emote } from './emote';

export type GetEmotesOut = Result<Emote[]> & {
    /**
     * A templated URL.
     * "https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}"
     */
    template: string;
};
