import { action, makeObservable, observable, runInAction } from 'mobx';
import { apiHelix } from 'src/api';
import { ChatSettings, UpdateChatSettingsIn } from 'src/types';

class ChatSettingsStore {
    loading = false;
    chatSettings: ChatSettings | undefined;

    constructor() {
        makeObservable(this, {
            loading: observable,
            chatSettings: observable,
            getChatSettings: action,
            updateChatSettings: action
        });
    }

    getChatSettings = (userID: string) => {
        this.loading = true;

        apiHelix
            .getChatSettings({ broadcaster_id: userID })
            .then(({ data }) => {
                runInAction(() => {
                    const [chatSettings] = data;
                    this.chatSettings = chatSettings;
                });
            })
            .finally(() => this.loading = false);
    };

    updateChatSettings = (userID: string, body: UpdateChatSettingsIn['body']) => {
        apiHelix
            .updateChatSettings({
                params: { broadcaster_id: userID, moderator_id: userID },
                body
            })
            .then(({ data }) => {
                runInAction(() => {
                    const [updatedChatSettings] = data;
                    this.chatSettings = updatedChatSettings;
                });
            });
    };
}

export const useChatSettingsStore = new ChatSettingsStore();