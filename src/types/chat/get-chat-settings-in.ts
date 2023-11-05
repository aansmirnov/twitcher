import { ClearChatIn } from './clear-chat-in';

export type GetChatSettingsIn = Pick<ClearChatIn, 'broadcaster_id'> &
    Partial<Pick<ClearChatIn, 'moderator_id'>>;
