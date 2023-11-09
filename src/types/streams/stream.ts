import { StreamType } from './stream-type';

export type Stream = {
    /**
     * An ID that identifies the stream
     */
    id: string;
    /**
     * The ID of the user that’s broadcasting the stream.
     */
    user_id: string;
    /**
     * The user’s login name.
     */
    user_login: string;
    /**
     * The user’s display name.
     */
    user_name: string;
    /**
     * The ID of the category or game being played.
     */
    game_id: string;
    /**
     * The name of the category or game being played.
     */
    game_name: string;
    /**
     * The type of stream.
     */
    type: StreamType;
    /**
     * The stream’s title. Is an empty string if not set.
     */
    title: string;
    /**
     * The tags applied to the stream.
     */
    tags: string[];
    /**
     * The number of users watching the stream.
     */
    viewer_count: number;
    /**
     * The UTC date and time (in RFC3339 format) of when the broadcast began.
     */
    started_at: string;
    /**
     * The language that the stream uses.
     * This is an ISO 639-1 two-letter language code or other if the stream uses a language not in the list of supported stream languages.
     */
    language: string;
    /**
     * A URL to an image of a frame from the last 5 minutes of the stream.
     * Replace the width and height placeholders in the URL ({width}x{height}) with the size of the image you want, in pixels.
     */
    thumbnail_url: string;
    /**
     * The list of tags that apply to the stream.
     */
    tag_ids: string[];
    /**
     * A Boolean value that indicates whether the stream is meant for mature audiences.
     */
    is_mature: boolean;
    /**
     * The cursor used to get the next page of results.
     * Set the request’s after or before query parameter to this value depending on whether you’re paging forwards or backwards.
     */
    pagination?: {
        cursor: string;
    };
};
