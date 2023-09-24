import { UserIcon } from 'src/icons';

import { Flex, Text } from '@chakra-ui/react';

export const ChannelViewers = () => (
    <Flex gap={2} alignItems='center'>
        <UserIcon w={4} h={4} color='red.500' />
        { /** TODO: Add real counter. */ }
        <Text color='red.500'>999</Text>
    </Flex>
);