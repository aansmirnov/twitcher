import { Result } from '../result';

type BanUserResponse = {
    /**
     * The broadcaster whose chat room the user was banned from chatting in.
     */
    broadcaster_id: string;
    /**
     * The moderator that banned or put the user in the timeout.
     */
    moderator_id: string;
    /**
     * The user that was banned or put in a timeout.
     */
    user_id: string;
    /**
     * The UTC date and time (in RFC3339 format) that the ban or timeout was placed.
     */
    created_at: string;
    /**
     * The UTC date and time (in RFC3339 format) that the timeout will end.
     * Is null if the user was banned instead of being put in a timeout.
     */
    end_time: string | null;
};

export type BanUserOut = Result<BanUserResponse[]>;
