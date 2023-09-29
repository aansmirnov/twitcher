import { useState } from 'react';
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { ChannelInformation } from 'src/types';
import { BrandedContentField, CategoryField, TagsField, TitleField } from './components';
import { UseChannelInformationReturnType } from 'src/hooks';

type EditPopupProps = {
    onClose: VoidFunction;
    currentUserChannelInfo: ChannelInformation;
    isOpen: boolean;
} & Pick<UseChannelInformationReturnType, 'updateChannelInformation'>

export const EditPopup = ({ onClose, currentUserChannelInfo: { title, game_name, game_id, is_branded_content, tags }, isOpen, updateChannelInformation }: EditPopupProps) => {
    const [channelTitle, setChannelTitle] = useState(title);
    const [categoryID, setCategoryID] = useState(game_id);
    const [categoryName, setCategoryName] = useState(game_name);
    const [isBrandedContent, setIsBrandedContent] = useState(is_branded_content);
    const [selectedTags, setSelectedTags] = useState(tags);

    const handleSelectCategory = (categoryName: string, categoryId: string) => {
        setCategoryName(categoryName);
        setCategoryID(categoryId);
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
            game_name: categoryName,
            game_id: categoryID,
            is_branded_content: isBrandedContent,
            tags: selectedTags,
        }, onClose);
    };

    return (
        <Modal colorScheme='whiteAlpha' onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Broadcast Options</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDirection='column' gap={4}>
                        <TitleField onChange={setChannelTitle} channelTitle={channelTitle} />
                        <CategoryField
                            handleSelectCategory={handleSelectCategory}
                            currentCategory={{ value: game_id, label: game_name, image: '' }}
                        />
                        <TagsField onDelete={handleDeleteTag} tags={selectedTags} onChange={handleChangeTag} />
                        <BrandedContentField onChange={setIsBrandedContent} checked={isBrandedContent} />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Flex gap={2}>
                        <Button colorScheme='gray' onClick={onClose}>Close</Button>
                        <Button colorScheme='purple' onClick={handleSave}>Save</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
