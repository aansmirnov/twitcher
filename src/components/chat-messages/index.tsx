import { Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useChatEventsStoreContext } from 'src/stores';

export const ChatMessages = observer(() => {
    const { messages } = useChatEventsStoreContext();

    if (!messages.length) {
        return null;
    }

    return (
        <Flex py={2} flexDirection='column-reverse' gap={2} overflowY='scroll' height='100%'>
            { messages.map((it, index) => {
                if (it.command?.command === 'NOTICE') {
                    // TODO: Handle it.
                }

                return (
                    <Flex key={`${it.parameters}-${index}`} px={4} alignItems='center'>
                        <Text color={it.tags?.color ?? 'gray.300'}>{it.tags?.displayName}</Text>
                        <Text color='white' mr={2}>:</Text>
                        <Text color='white'>{it?.parameters}</Text>
                    </Flex>
                );
            }) }
        </Flex>
    );
});