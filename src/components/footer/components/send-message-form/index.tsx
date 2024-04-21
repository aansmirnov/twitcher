import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useSendMessage } from './use-send-message';
import { ChannelManagement, EmoteList } from './components';

export const SendMessageForm = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    const [isInputActive, setIsInputActive] = useState(false);
    const { sendMessage } = useSendMessage();
    const isDisabled = value.trim().length > 500;
    const isCommand = useMemo(
        () => value.trim()[0] === '/' && isInputActive,
        [isInputActive, value],
    );

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

    const onCommandSelect = (command: string) => {
        if (inputRef?.current) {
            setValue(`${command} `);
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        const onClickOutside = (event: Event) => {
            const element = event?.target as Element | null;

            if (element && element.id !== 'chat-message') {
                setIsInputActive(false);
            }
        };

        document.addEventListener('click', onClickOutside);

        return () => {
            document.removeEventListener('click', onClickOutside);
        };
    }, [isInputActive, value]);

    return (
        <Flex grow={1} gap={2} position='relative'>
            <InputGroup>
                <Input
                    ref={inputRef}
                    id='chat-message'
                    _focus={{ background: 'gray.300' }}
                    size='sm'
                    value={value}
                    placeholder='Send a message'
                    variant='filled'
                    onFocus={() => setIsInputActive(true)}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter' && !isDisabled) {
                            handleSendMessage();
                        }
                    }}
                    onChange={(e) => setValue(e.target.value)}
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
            {isCommand && (
                <ChannelManagement value={value} onSelect={onCommandSelect} />
            )}
        </Flex>
    );
};
