export type Positions = { startPosition: number; endPosition: number };

export type Tags = {
    badges?: {
        [x: string]: string;
    } | null;
    badgesInfo?: {
        [x: string]: string;
    } | null;
    emotes?: {
        [x: string]: Positions[];
    } | null;
    userID?: string | null;
    id?: string | null;
    color?: string | null;
    displayName?: string | null;
    targetUserId?: string | null;
    [x: string]: unknown;
};

export type Source = {
    nick: string | null;
    host: string | null;
};

export type Command = {
    command?: string | null;
    channel?: string | null;
    [x: string]: unknown;
};

export type TwitchIrcMessage = {
    tags: Tags | null;
    source: Source | null;
    command: Command | null;
    parameters: string | null;
};
