import { UpDownIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, Text, Tooltip } from '@chakra-ui/react';
import { ChannelViewers } from 'src/components/header/components';

type HiddenHeaderProps = {
    channelTitle: string;
    channelCategory: string;
    onShowHeader: VoidFunction;
};

export const HiddenHeader = ({
    channelTitle,
    channelCategory,
    onShowHeader,
}: HiddenHeaderProps) => (
    <Box>
        <Flex justifyContent='space-around' p={4} alignItems='center' gap={2}>
            <Text color='white' fontWeight='semibold' noOfLines={1}>
                {channelTitle}
            </Text>
            <Text color='purple.300' fontWeight='semibold' noOfLines={1}>
                {channelCategory}
            </Text>
            <ChannelViewers />
            <Tooltip borderRadius='lg' placement='bottom' label='Expand'>
                <UpDownIcon
                    cursor='pointer'
                    _hover={{ color: 'gray.300' }}
                    color='white'
                    onClick={onShowHeader}
                />
            </Tooltip>
        </Flex>
        <Divider />
    </Box>
);
