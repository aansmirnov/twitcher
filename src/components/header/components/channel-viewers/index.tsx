import { UserIcon } from 'src/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useStreamStoreContext } from 'src/stores';

export const ChannelViewers = () => {
    const { ownStreamViewers } = useStreamStoreContext();

    return (
        <Flex gap={2} alignItems='center'>
            <UserIcon w={4} h={4} color='red.500' />
            <Text color='red.500'>{ownStreamViewers}</Text>
        </Flex>
    );
};
