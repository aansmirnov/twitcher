import { ChannelInformation } from './channel-information';

export type UpdateChannelInformationIn = Partial<Omit<ChannelInformation, 'broadcaster_login' | 'broadcaster_name'>>