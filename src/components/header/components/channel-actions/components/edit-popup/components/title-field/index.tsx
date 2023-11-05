import { Flex, Input, Text } from '@chakra-ui/react';
import { TITLE_LIMIT } from 'src/consts';
import { FieldName } from '../field-name';

type TitleFieldProps = {
    channelTitle: string;
    onChange: (value: string) => void;
};

export const TitleField = ({ channelTitle, onChange }: TitleFieldProps) => {
    const titleCount = channelTitle.length;

    const handleChange = (value: string) => {
        if (value.length > TITLE_LIMIT) {
            return;
        }

        onChange(value);
    };

    return (
        <Flex flexDirection='column' gap={1}>
            <FieldName text='Title' />
            <Input
                focusBorderColor='purple.500'
                variant='filled'
                value={channelTitle}
                onChange={(e) => handleChange(e.target.value)}
            />
            <Text fontSize='sm' color='gray.500' textAlign='right'>
                {titleCount}/{TITLE_LIMIT}
            </Text>
        </Flex>
    );
};
