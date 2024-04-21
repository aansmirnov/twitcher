import { Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { TwitchIrcMessage } from 'src/types';
import { useChat } from 'src/components/chat-messages/use-chat';
import { DeleteIcon, NotAllowedIcon, TimeIcon } from '@chakra-ui/icons';
import { UserInfoName } from './user-info-name';
import {
    useChatEventsStoreContext,
    useCurrentUserStoreContext,
} from 'src/stores';
import { observer } from 'mobx-react';

type UserMessageRendererProps = {
    message: TwitchIrcMessage;
    badgesURL?: Array<{ name?: string; url?: string }>;
};

const ICON_PROPS = {
    color: 'white',
    cursor: 'pointer',
};

export const UserMessageRenderer = observer(
    ({ message, badgesURL = [] }: UserMessageRendererProps) => {
        const {
            emotesMapByName,
            deleteChatMessage,
            banUser,
            toggleUserMod,
            toggleUserVip,
        } = useChat();
        const { currentUser } = useCurrentUserStoreContext();
        const { vipAndModUsersMap } = useChatEventsStoreContext();
        const hasBadges = badgesURL.length > 0;
        const messageUserID = message.tags?.userID || '';
        const isCurrentUserMessage = currentUser?.id === messageUserID;
        const shouldShowActionIcons =
            !isCurrentUserMessage && message.parameters !== '<Message Deleted>';
        const permissions = vipAndModUsersMap[messageUserID];
        const isMod = permissions?.isMod || false;
        const isVip = permissions?.isVip || false;
        const userName = message.tags?.displayName || '';

        if (!message.parameters) {
            return null;
        }

        const onDeleteMessage = () => {
            if (message.tags?.id) {
                deleteChatMessage(message.tags.id);
            }
        };

        const onBanUser = (duration?: number) => {
            if (message.tags?.userID) {
                banUser(
                    {
                        user_id: message.tags.userID,
                        duration,
                    },
                    userName,
                );
            }
        };

        const onToggleUserMode = () => {
            if (message.tags?.userID) {
                toggleUserMod(message.tags.userID, isMod, userName);
            }
        };

        const onToggleUserVip = () => {
            if (message.tags?.userID) {
                toggleUserVip(message.tags.userID, isVip, userName);
            }
        };

        const currentMessage = message.tags?.emotes ? (
            <Flex alignItems='center' gap='4px'>
                {message.parameters.split(' ').map((message, index) => {
                    const emote = emotesMapByName[message];

                    if (!emote) {
                        return (
                            <Text color='white' key={`${message}-${index}`}>
                                {message}
                            </Text>
                        );
                    }

                    return (
                        <Image
                            key={`${emote.name}-${index}`}
                            src={emote.images.url_1x}
                        />
                    );
                })}
            </Flex>
        ) : (
            <Text color='white'>{message.parameters}</Text>
        );

        return (
            <Flex px={4} alignItems='center'>
                {shouldShowActionIcons && (
                    <Flex gap={2} mr={2} alignItems='center'>
                        <Tooltip
                            borderRadius='lg'
                            placement='top'
                            label={`Ban ${userName}`}
                        >
                            <NotAllowedIcon
                                onClick={() => onBanUser()}
                                fontSize='16'
                                {...ICON_PROPS}
                            />
                        </Tooltip>
                        <Tooltip
                            borderRadius='lg'
                            placement='top'
                            label={`Timeout ${userName}`}
                        >
                            <TimeIcon
                                {...ICON_PROPS}
                                fontSize='14'
                                onClick={() => onBanUser(600)}
                            />
                        </Tooltip>
                        <Tooltip
                            borderRadius='lg'
                            placement='top'
                            label='Delete message'
                        >
                            <DeleteIcon
                                {...ICON_PROPS}
                                fontSize='14'
                                onClick={onDeleteMessage}
                            />
                        </Tooltip>
                    </Flex>
                )}
                {hasBadges &&
                    badgesURL.map((it) => (
                        <Flex key={it.url} gap={1}>
                            <Tooltip
                                borderRadius='lg'
                                placement='top'
                                label={it.name}
                            >
                                <Image src={it.url} />
                            </Tooltip>
                        </Flex>
                    ))}
                {userName && (
                    <UserInfoName
                        onClickMod={onToggleUserMode}
                        onClickVip={onToggleUserVip}
                        amICurrentUser={isCurrentUserMessage}
                        ml={hasBadges ? '2' : '0'}
                        isMod={isMod}
                        isVip={isVip}
                        userName={userName}
                        userColor={message.tags?.color ?? 'gray.300'}
                    />
                )}
                <Text color='white' mr={2}>
                    :
                </Text>
                {currentMessage}
            </Flex>
        );
    },
);
