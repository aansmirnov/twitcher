import { Button, Input, Popup } from 'src/components/ui';
import { useSearchCategory } from './use-search-category';
import { useVisibilityState } from 'src/hooks';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { UpdateChannelInformation } from 'src/types';

type EditCategoryPopupProps = {
    onClose: VoidFunction;
    categoryName: string;
    onSave: (body: UpdateChannelInformation, callback: VoidFunction) => void;
}

export const EditCategoryPopup = ({ onClose, categoryName, onSave }: EditCategoryPopupProps) => {
    const { categoryTitle, handleChangeTitle, categories, hasCategories } = useSearchCategory(categoryName);
    const [isCategoryListVisible, { show, hide }] = useVisibilityState();
    const [categoryID, setCategoryID] = useState<string>();

    const handleInputClick = (e: MouseEvent<HTMLInputElement> ) => {
        e.stopPropagation();
        show();
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleChangeTitle(e.target.value);
        if (!isCategoryListVisible) {
            show();
        }
    };

    const handleSelectCategory = (categoryName: string, categoryId: string) => {
        handleChangeTitle(categoryName);
        setCategoryID(categoryId);
    };

    const handleSave = () => {
        if (categoryID) {
            onSave({ game_id: categoryID, game_name: categoryTitle }, onClose);
            return;
        }
        onClose();
    };

    return (
        <Popup onPopupClick={hide}>
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold text-2xl'>Change category</h2>
                <div className='group relative'>
                    <Input onClick={handleInputClick} value={categoryTitle} onChange={handleChangeInput} />
                    <div className='absolute w-full max-h-[300px] top-[52px] left-0 bg-white rounded-xl shadow shadow-gray-500/50 overflow-y-scroll hover:cursor-pointer'>
                        { hasCategories && isCategoryListVisible && categories.map((category) => (
                            <div onClick={() => handleSelectCategory(category.name, category.id)} key={category.id} className='flex p-4 gap-2 items-center hover:bg-gray-200'>
                                <img className='w-8 h-8' src={category.box_art_url} alt={category.name} />
                                <span>{category.name}</span>
                            </div>
                        )) }
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Button variant='primary' onClick={handleSave}>Save</Button>
                    <Button variant='secondary' onClick={onClose}>Close</Button>
                </div>
            </div>
        </Popup>
    );
};