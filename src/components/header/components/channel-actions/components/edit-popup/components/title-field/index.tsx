import { Input } from 'src/components/ui';
import { TITLE_LIMIT } from 'src/consts';
import { FieldName } from '../field-name';

type TitleFieldProps = {
    channelTitle: string;
    onChange: (value: string) => void;
}

export const TitleField = ({ channelTitle, onChange }: TitleFieldProps) => {
    const titleCount = channelTitle.length;

    const handleChange = (value: string) => {
        if (value.length > TITLE_LIMIT) {
            return;
        }

        onChange(value);
    };

    return (
        <div className='flex flex-col gap-1'>
            <FieldName text='Title' />
            <Input value={channelTitle} onChange={(e) => handleChange(e.target.value)} />
            <span className='text-sm text-right text-gray-500'>{titleCount}/{TITLE_LIMIT}</span>
        </div>
    );
};