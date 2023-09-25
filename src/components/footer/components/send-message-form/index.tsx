import { Button, Flex, Input } from '@chakra-ui/react';

export const SendMessageForm = () => {
    return (
        <Flex grow={1} gap={2}>
            <Input
                _focus={{ background: 'gray.300' }}
                size='sm'
                placeholder='Send a message'
                variant='filled'
            />
            <Button size='sm' colorScheme='purple'>Chat</Button>
        </Flex>
    );
};