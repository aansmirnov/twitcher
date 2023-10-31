import { Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import { TwitchIrcMessage } from 'src/types';
import { useChat } from 'src/components/chat-messages/use-chat';

type UserMessageRendererProps = {
    message: TwitchIrcMessage;
    badgesURL?: Array<{ name?: string; url?: string }>;
}

export const UserMessageRenderer = ({ message, badgesURL = [] }: UserMessageRendererProps) => {
    const { emotesMapByName, deleteChatMessage } = useChat();
    const hasBadges = badgesURL.length > 0;

    if (!message.parameters) {
        return null;
    }

    const onDeleteMessage = () => {
        if (message.tags?.id) {
            deleteChatMessage(message.tags.id);
        }
    };

    const currentMessage = message.tags?.emotes ? (
        <Flex alignItems='center' gap='4px'>
            {message.parameters.split(' ').map((message, index) => {
                const emote = emotesMapByName[message];

                if (!emote) {
                    return <Text color='white' key={`${message}-${index}`}>{message}</Text>;
                }

                return (
                    <Image key={`${emote.name}-${index}`} src={emote.images.url_1x} />
                );
            })}
        </Flex>
    ) : (
        <Text color='white'>{message.parameters}</Text>
    );

    return (
        <Flex px={4} alignItems='center'>
            { hasBadges && badgesURL.map((it) => (
                <Flex key={it.url} gap={1}>
                    <Tooltip borderRadius='lg' placement='top' label={it.name}>
                        <Image src={it.url} />
                    </Tooltip>
                </Flex>
            )) }
            <Menu placement='top-start'>
                <MenuButton>
                    <Text ml={hasBadges ? '2' : '0'} color={message.tags?.color ?? 'gray.300'}>{message.tags?.displayName}</Text>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onDeleteMessage}>Delete message</MenuItem>
                </MenuList>
            </Menu>
            <Text color='white' mr={2}>:</Text>
            {currentMessage}
        </Flex>
    );
};