import { ChatSettings } from './chat-settings';
import { ClearChatIn } from './clear-chat-in';

export type UpdateChatSettingsIn = {
    /**
     * Request query params
     */
    params: Pick<ClearChatIn, 'broadcaster_id' | 'moderator_id'>;
    /**
     * Request body
     */
    body: Partial<Omit<ChatSettings, 'broadcaster_id' | 'moderator_id'>>;
};
