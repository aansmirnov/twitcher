import { useState } from 'react';
import { Button, Flex, Input, Spacer, Tag, TagCloseButton, Text } from '@chakra-ui/react';
import { TAG_LIMIT } from 'src/consts';
import { FieldName } from '../field-name';

type TagsFieldProps = {
    tags: string[];
    onChange: (value: string) => void;
    onDelete: (index: number) => void;
}

export const TagsField = ({ tags, onChange, onDelete }: TagsFieldProps) => {
    const [tagName, setTagName] = useState('');

    const handleAddTag = () => {
        if (tags.length === 10) {
            return;
        }

        if (tagName.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) || tagName.trim().length === 0) {
            return;
        }

        onChange(tagName.replace(/\s+/g, ''));
        setTagName('');
    };

    const handleChangeTagName = (value: string) => {
        if (value.trim().length > 25) {
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
                <Spacer />
                <Text color='gray.500' fontSize='sm'>{tagName.length}/{TAG_LIMIT}</Text>
            </Flex>
            <Text color='black' fontWeight='medium' fontSize='xs' className='text-xs font-medium text-black'>Add up to 10 tags. Each tag can be 25 characters long with no spaces or special characters.</Text>
        </Flex>
    );
};