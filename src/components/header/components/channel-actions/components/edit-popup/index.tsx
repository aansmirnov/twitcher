import { useState } from 'react';
import { Button, Popup } from 'src/components/ui';
import { ChannelInformation } from 'src/types';
import { BrandedContentField, CategoryField, TagsField, TitleField } from './components';
import { useCurrentUserScope } from 'src/scopes';

type EditPopupProps = {
    onClose: VoidFunction;
    currentUserChannelInfo: ChannelInformation;
}

export const EditPopup = ({ onClose, currentUserChannelInfo: { title, game_name, game_id, is_branded_content, tags } }: EditPopupProps) => {
    const [channelTitle, setChannelTitle] = useState(title);
    const [categoryID, setCategoryID] = useState<string>();
    const [selectedCategoryName, setSelectedCategoryName] = useState(game_name);
    const [isBrandedContent, setIsBrandedContent] = useState(is_branded_content);
    const [selectedTags, setSelectedTags] = useState(tags);
    const { updateChannelInformation } = useCurrentUserScope();

    const handleSelectCategory = (categoryName: string, categoryId: string) => {
        setSelectedCategoryName(categoryName);
        setCategoryID(categoryId);
    };

    const handleClearCategoryField = () => {
        setSelectedCategoryName('');
        setCategoryID(undefined);
    };

    const handleChangeTag = (value: string) => {
        setSelectedTags((prev) => [...prev, value]);
    };

    const handleDeleteTag = (indexToDelete: number) => {
        setSelectedTags((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    const handleSave = () => {
        updateChannelInformation({
            title: channelTitle,
            game_name: selectedCategoryName,
            // '0' for delete category
            game_id: selectedCategoryName.length > 0 ? categoryID ?? game_id : '0',
            is_branded_content: isBrandedContent,
            tags: selectedTags,
        }, onClose);
    };

    return (
        <Popup onClose={onClose}>
            <h2 className='font-bold text-2xl'>Broadcast Options</h2>
            <div className='mt-4 flex flex-col gap-4'>
                <TitleField onChange={setChannelTitle} channelTitle={channelTitle} />
                <CategoryField
                    clearable={selectedCategoryName.length > 0}
                    onClear={handleClearCategoryField}
                    handleSelectCategory={handleSelectCategory}
                    categoryName={selectedCategoryName}
                />
                <TagsField onDelete={handleDeleteTag} tags={selectedTags} onChange={handleChangeTag} />
                <BrandedContentField onChange={setIsBrandedContent} checked={isBrandedContent} />
            </div>
            <div className='flex gap-2 mt-6'>
                <Button onClick={handleSave}>Save</Button>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
        </Popup>
    );
};
