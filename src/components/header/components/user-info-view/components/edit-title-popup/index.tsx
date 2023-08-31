import { useState } from 'react';
import { Button, Input, Popup } from 'src/components/ui';
import { UpdateChannelInformation } from 'src/types';

type EditTitlePopupProps = {
    onClose: VoidFunction;
    onSave: (body: UpdateChannelInformation, callback: VoidFunction) => void;
    title: string;
}

const LIMIT = 140;

export const EditTitlePopup = ({ onClose, title, onSave }: EditTitlePopupProps) => {
    const [value, setValue] = useState(title);
    const titleCount = value.length;

    const handleChangeTitle = (value: string) => {
        if (value.length > LIMIT) {
            return;
        }

        setValue(value);
    };

    const handleSave = () => {
        onSave({ title: value }, onClose);
    };

    return (
        <Popup>
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold text-2xl'>Change title</h2>
                <div className='flex flex-col gap-1'>
                    <Input value={value} onChange={(e) => handleChangeTitle(e.target.value)} />
                    <span className='text-sm text-right text-gray-500'>{titleCount}/{LIMIT}</span>
                </div>
                <div className='flex gap-2'>
                    <Button variant='primary' onClick={handleSave}>Save</Button>
                    <Button variant='secondary' onClick={onClose}>Close</Button>
                </div>
            </div>
        </Popup>
    );
};