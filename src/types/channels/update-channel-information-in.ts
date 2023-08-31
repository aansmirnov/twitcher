import { ChannelInformation } from './channel-information';

export type UpdateChannelInformation = Partial<Pick<ChannelInformation, 'game_id' | 'broadcaster_language' | 'title' | 'delay' | 'tags' | 'content_classification_labels' | 'is_branded_content' | 'game_name'>>;
export type UpdateChannelInformationIn = UpdateChannelInformation & Pick<ChannelInformation, 'broadcaster_id'>;