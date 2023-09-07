import { useState } from 'react';
import { Button, Popup } from 'src/components/ui';
import { UpdateChannelInformation } from 'src/types';
import { ChangeCategory } from 'src/components/header/components';

type EditCategoryPopupProps = {
    onClose: VoidFunction;
    categoryName: string;
    onSave: (body: UpdateChannelInformation, callback: VoidFunction) => void;
}

export const EditCategoryPopup = ({ onClose, categoryName, onSave }: EditCategoryPopupProps) => {
    const [categoryID, setCategoryID] = useState<string>();
    const [selectedCategoryName, setSelectedCategoryName] = useState(categoryName);

    const handleSelectCategory = (categoryName: string, categoryId: string) => {
        setSelectedCategoryName(categoryName);
        setCategoryID(categoryId);
    };

    const handleSave = () => {
        if (categoryID) {
            onSave({ game_id: categoryID, game_name: selectedCategoryName }, onClose);
            return;
        }
        onClose();
    };

    return (
        <Popup onClose={onClose}>
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold text-2xl'>Change Category</h2>
                <ChangeCategory handleSelectCategory={handleSelectCategory} categoryName={categoryName} />
                <div className='flex gap-2'>
                    <Button variant='primary' onClick={handleSave}>Save</Button>
                    <Button variant='secondary' onClick={onClose}>Close</Button>
                </div>
            </div>
        </Popup>
    );
};