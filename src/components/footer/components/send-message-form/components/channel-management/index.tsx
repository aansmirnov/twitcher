import { Box, Flex, Text } from '@chakra-ui/react';
import {
    BAN_COMMAND,
    MOD_COMMAND,
    UNBAN_COMMAND,
    UNMOD_COMMAND,
    UNVIP_COMMAND,
    VIP_COMMAND,
} from '../../consts';

const COMMANDS_LIST = [
    { command: BAN_COMMAND, description: 'Permanently ban a user from Chat' },
    {
        command: UNBAN_COMMAND,
        description: 'Remove a timeout or permanent ban on a user',
    },
    { command: MOD_COMMAND, description: 'Grant moderator status to a user' },
    {
        command: UNMOD_COMMAND,
        description: 'Revoke moderator status from a user',
    },
    { command: VIP_COMMAND, description: 'Grant VIP status to a user' },
    { command: UNVIP_COMMAND, description: 'Revoke VIP status from a user' },
];

type ChannelManagementProps = {
    value: string;
    onSelect: (command: string) => void;
};

export const ChannelManagement = ({
    value,
    onSelect,
}: ChannelManagementProps) => {
    return (
        <Box
            position='absolute'
            bottom='10'
            left='0'
            bg='gray.700'
            borderRadius='md'
        >
            <Flex direction='column' gap={1.5}>
                {COMMANDS_LIST.filter((it) => it.command.includes(value)).map(
                    (it, index) => (
                        <Flex
                            onClick={() => onSelect(it.command)}
                            p={3}
                            key={`${it.command}-${index}`}
                            direction='column'
                            cursor='pointer'
                            _hover={{ bg: 'gray.500', borderRadius: 'md' }}
                        >
                            <Text color='white' fontSize={16}>
                                {it.command} {'{username}'}
                            </Text>
                            <Text color='gray.200' fontSize={14}>
                                {it.description}
                            </Text>
                        </Flex>
                    ),
                )}
            </Flex>
        </Box>
    );
};
