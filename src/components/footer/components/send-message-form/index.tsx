import { useState } from 'react';
import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useSendMessage } from './use-send-message';
import { EmoteList } from './components';

export const SendMessageForm = () => {
    const [value, setValue] = useState('');
    const { sendMessage } = useSendMessage();
    const isDisabled = value.trim().length > 500;

    const handleSendMessage = () => {
        if (!value.trim().length) {
            return;
        }

        sendMessage(value);
        setValue('');
    };

    const onSelecteEmote = (emote: string) => {
        if (value.trim().length > 0) {
            setValue((prev) => prev + ` ${emote} `);
            return;
        }

        setValue(`${emote} `);
    };

    return (
        <Flex grow={1} gap={2}>
            <InputGroup>
                <Input
                    _focus={{ background: 'gray.300' }}
                    size='sm'
                    value={value}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter' && !isDisabled) {
                            handleSendMessage();
                        }
                    }}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Send a message'
                    variant='filled'
                />
                <InputRightElement>
                    <EmoteList onSelectEmote={onSelecteEmote} />
                </InputRightElement>
            </InputGroup>
            <Button
                isDisabled={isDisabled}
                size='sm'
                colorScheme='purple'
                onClick={handleSendMessage}
            >
                Chat
            </Button>
        </Flex>
    );
};
