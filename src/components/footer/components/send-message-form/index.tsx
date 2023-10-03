import { useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useChatEventsStore } from 'src/stores';

export const SendMessageForm = () => {
    const [value, setValue] = useState('');
    const { sendMessage } = useChatEventsStore;

    const handleSendMessage = () => {
        if (!value.trim().length) {
            return;
        }

        sendMessage(value);
        setValue('');
    };
    return (
        <Flex grow={1} gap={2}>
            <Input
                _focus={{ background: 'gray.300' }}
                size='sm'
                value={value}
                onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                        handleSendMessage();
                    }
                }}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Send a message'
                variant='filled'
            />
            <Button size='sm' colorScheme='purple' onClick={handleSendMessage}>Chat</Button>
        </Flex>
    );
};