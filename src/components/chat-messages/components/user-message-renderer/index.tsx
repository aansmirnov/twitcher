import { Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { TwitchIrcMessage } from 'src/types';
import { useChat } from 'src/components/chat-messages/use-chat';
import { useTwitcherConfigStoreContext } from 'src/stores';
import { DeleteIcon, NotAllowedIcon, TimeIcon } from '@chakra-ui/icons';
import { UserInfoName } from './user-info-name';

type UserMessageRendererProps = {
    message: TwitchIrcMessage;
    badgesURL?: Array<{ name?: string; url?: string }>;
};

const ICON_PROPS = {
    fontSize: 'xs',
    color: 'white',
    cursor: 'pointer',
};

export const UserMessageRenderer = ({
    message,
    badgesURL = [],
}: UserMessageRendererProps) => {
    const {
        emotesMapByName,
        deleteChatMessage,
        banUser,
        toggleUserMode,
        toggleUserVip,
    } = useChat();
    const { currentUser } = useTwitcherConfigStoreContext();
    const hasBadges = badgesURL.length > 0;
    const isCurrentUserMessage = currentUser?.id === message.tags?.userID;
    const shouldShowActionIcons =
        !isCurrentUserMessage && message.parameters !== '<Message Deleted>';
    const isMod = Boolean(message.tags?.badges?.['moderator']);
    const isVip = Boolean(message.tags?.badges?.['vip']);

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
            banUser({
                user_id: message.tags.userID,
                duration,
            });
        }
    };

    const onToggleUserMode = () => {
        if (message.tags?.userID) {
            toggleUserMode(message.tags.userID, isMod);
        }
    };

    const onToggleUserVip = () => {
        if (message.tags?.userID) {
            toggleUserVip(message.tags.userID, isVip);
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
                <Flex gap={2} mr={2}>
                    <Tooltip
                        borderRadius='lg'
                        placement='top'
                        label={`Ban ${message.tags?.displayName}`}
                    >
                        <NotAllowedIcon
                            onClick={() => onBanUser()}
                            {...ICON_PROPS}
                        />
                    </Tooltip>
                    <Tooltip
                        borderRadius='lg'
                        placement='top'
                        label={`Timeout ${message.tags?.displayName}`}
                    >
                        <TimeIcon
                            {...ICON_PROPS}
                            onClick={() => onBanUser(600)}
                        />
                    </Tooltip>
                    <Tooltip
                        borderRadius='lg'
                        placement='top'
                        label='Delete message'
                    >
                        <DeleteIcon {...ICON_PROPS} onClick={onDeleteMessage} />
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
            {message.tags?.displayName && (
                <UserInfoName
                    onClickMod={onToggleUserMode}
                    onClickVip={onToggleUserVip}
                    amICurrentUser={isCurrentUserMessage}
                    ml={hasBadges ? '2' : '0'}
                    isMod={isMod}
                    isVip={isVip}
                    userName={message.tags.displayName}
                    userColor={message.tags?.color ?? 'gray.300'}
                />
            )}
            <Text color='white' mr={2}>
                :
            </Text>
            {currentMessage}
        </Flex>
    );
};
