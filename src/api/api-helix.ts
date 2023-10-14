import axios from 'axios';
import {
    GetUsersOut,
    GetUsersIn,
    GetChannelsInformationIn,
    GetChannelsInformationOut,
    UpdateChannelInformationIn,
    GetCategoriesIn,
    GetCategoriesOut,
    ClearChatIn,
    GetChatSettingsIn,
    GetChatSettingsOut,
    UpdateChatSettingsIn,
    UpdateChatSettingsOut,
    GetBadgesOut,
    GetBadgesIn,
    GetEmotesIn,
    GetEmotesOut
} from 'src/types';
import { ApiRequest } from './api-request';
import { CLIENT_ID, TWITCHER_ACCESS_TOKEN, TWITCH_HELIX_URL } from 'src/consts';

interface IApiHelix {
    getUsers(params?: GetUsersIn): Promise<GetUsersOut>;
    getChannelsInformation(params: GetChannelsInformationIn): Promise<GetChannelsInformationOut>;
    updateChannelInformation(params: UpdateChannelInformationIn): Promise<void>;
    getCategories(params: GetCategoriesIn): Promise<GetCategoriesOut>;
    clearChat(params: ClearChatIn): Promise<void>;
    getChatSettings(params: GetChatSettingsIn): Promise<GetChatSettingsOut>;
    updateChatSettings(body: UpdateChatSettingsIn): Promise<UpdateChatSettingsOut>
    getBadges(): Promise<GetBadgesOut>
    getChanngelBadges(params: GetBadgesIn): Promise<GetBadgesOut>
    getChannelEmotes(params: GetEmotesIn): Promise<GetEmotesOut>;
    getEmotes(): Promise<GetEmotesOut>;
}

class ApiHelix extends ApiRequest implements IApiHelix {
    getUsers(params?: GetUsersIn): Promise<GetUsersOut> {
        return this.provider.get('/users', { params });
    }

    getChannelsInformation(params: GetChannelsInformationIn): Promise<GetChannelsInformationOut> {
        return this.provider.get('/channels', { params });
    }

    updateChannelInformation(params: UpdateChannelInformationIn): Promise<void> {
        const { broadcaster_id, ...body } = params;
        return this.provider.patch('/channels', body, { params: { broadcaster_id } } );
    }

    getCategories(params: GetCategoriesIn): Promise<GetCategoriesOut> {
        return this.provider.get('/search/categories', { params });
    }

    clearChat(params: ClearChatIn): Promise<void> {
        return this.provider.delete('/moderation/chat', { params });
    }

    getChatSettings(params: GetChatSettingsIn): Promise<GetChatSettingsOut> {
        return this.provider.get('/chat/settings', { params });
    }

    updateChatSettings({ params, body }: UpdateChatSettingsIn): Promise<GetChatSettingsOut> {
        return this.provider.patch('/chat/settings', body , { params });
    }

    getBadges(): Promise<GetBadgesOut> {
        return this.provider.get('/chat/badges/global');
    }

    getChanngelBadges(params: GetBadgesIn): Promise<GetBadgesOut> {
        return this.provider.get('/chat/badges', { params });
    }

    getChannelEmotes(params: GetEmotesIn): Promise<GetEmotesOut> {
        return this.provider.get('/chat/emotes', { params });
    }

    getEmotes(): Promise<GetEmotesOut> {
        return this.provider.get('/chat/emotes/global');
    }
}

export const apiHelix = new ApiHelix(
    axios.create({
        baseURL: TWITCH_HELIX_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TWITCHER_ACCESS_TOKEN)}`,
            'Client-Id': CLIENT_ID,
            'Content-Type': 'application/json'
        }
    })
);