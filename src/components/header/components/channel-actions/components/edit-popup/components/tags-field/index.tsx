import { useState } from 'react';
import { TagsList } from 'src/components';
import { Button, Input } from 'src/components/ui';
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

        if (tagName.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
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
        <div className="flex flex-col gap-1">
            <FieldName text='Tags' />
            <div className='flex justify-between'>
                <Input onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTag();
                    }
                }} className='h-8 !w-[390px]' value={tagName} onChange={(e) => handleChangeTagName(e.target.value) } />
                <Button size="s" className='text-xs' onClick={handleAddTag}>Add tag</Button>
            </div>
            <div className='flex justify-between items-start'>
                <TagsList onDelete={onDelete} withDelete tags={tags} />
                <span className='text-sm text-gray-500'>{tagName.length}/{TAG_LIMIT}</span>
            </div>
            <span className='text-xs font-medium text-black'>Add up to 10 tags. Each tag can be 25 characters long with no spaces or special characters.</span>
        </div>
    );
};