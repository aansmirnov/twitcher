import { useState } from 'react';
import { Button, Flex, Input, Tag, TagCloseButton, Text } from '@chakra-ui/react';
import { FieldName } from '../field-name';
import { TAG_NAME_LIMIT, TAG_COUNT_LIMIT } from 'src/consts';

type TagsFieldProps = {
    tags: string[];
    onChange: (value: string) => void;
    onDelete: (index: number) => void;
}

export const TagsField = ({ tags, onChange, onDelete }: TagsFieldProps) => {
    const [tagName, setTagName] = useState('');

    const handleAddTag = () => {
        if (tags.length === TAG_COUNT_LIMIT) {
            return;
        }

        if (tagName.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) || tagName.trim().length === 0) {
            return;
        }

        onChange(tagName.replace(/\s+/g, ''));
        setTagName('');
    };

    const handleChangeTagName = (value: string) => {
        if (value.trim().length > TAG_NAME_LIMIT) {
            return;
        }
        setTagName(value);
    };

    return (
        <Flex gap={1} flexDirection='column'>
            <FieldName text='Tags' />
            <Flex gap={1} mb={2}>
                <Input focusBorderColor='purple.500' variant='filled' onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTag();
                    }
                }} value={tagName} onChange={(e) => handleChangeTagName(e.target.value) } />
                <Button colorScheme='facebook' fontSize='sm' onClick={handleAddTag}>Add tag</Button>
            </Flex>
            <Flex alignItems='self-start'>
                <Flex wrap='wrap' gap={2}>
                    { tags.map((it, index) => (
                        <Tag borderRadius='full' bg='gray.700' color='white' fontWeight='semibold' key={index}>
                            {it}
                            <TagCloseButton onClick={() => onDelete(index)} />
                        </Tag>
                    )) }
                </Flex>
            </Flex>
            <Text color='black' fontWeight='medium' fontSize='xs' className='text-xs font-medium text-black'>Add up to {TAG_COUNT_LIMIT} tags. Each tag can be {TAG_NAME_LIMIT} characters long with no spaces or special characters.</Text>
        </Flex>
    );
};