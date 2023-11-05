import { Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useChatEventsStoreContext } from 'src/stores';
import { useChat } from './use-chat';
import { UserMessageRenderer } from './components';

export const ChatMessages = observer(() => {
    const { messages } = useChatEventsStoreContext();
    const { badgesMapBySetID } = useChat();

    if (!messages.length || !Object.keys(badgesMapBySetID).length) {
        return null;
    }

    return (
        <Flex
            py={2}
            flexDirection='column-reverse'
            gap={2}
            overflowY='scroll'
            height='100%'
        >
            {messages.map((it, index) => {
                if (it.command?.command === 'NOTICE' && it.parameters) {
                    return (
                        <Text
                            px={4}
                            color='gray.300'
                            key={`${it.parameters}-${index}`}
                        >
                            {it.parameters}
                        </Text>
                    );
                }

                const badges = Object.keys(it.tags?.badges || {});
                const badgesURL = badges.map((badge: string) => {
                    const currentBadge = badgesMapBySetID[badge];

                    if (!currentBadge) {
                        return {};
                    }

                    return {
                        name: currentBadge.versions.title,
                        url: currentBadge.versions.image_url_1x,
                    };
                });

                return (
                    <UserMessageRenderer
                        key={`${it.parameters}-${index}`}
                        message={it}
                        badgesURL={badgesURL}
                    />
                );
            })}
        </Flex>
    );
});
