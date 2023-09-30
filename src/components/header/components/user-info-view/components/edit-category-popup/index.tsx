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
import { UpdateChannelInformationIn } from 'src/types';
import { ChangeCategory } from 'src/components/header/components';

type EditCategoryPopupProps = {
    onClose: VoidFunction;
    categoryName: string;
    categoryId: string;
    isOpen: boolean;
    onSave: (body: UpdateChannelInformationIn, callback: VoidFunction) => void;
}

export const EditCategoryPopup = ({ onClose, categoryName, categoryId, isOpen, onSave }: EditCategoryPopupProps) => {
    const [categoryID, setCategoryID] = useState(categoryId);
    const [selectedCategoryName, setSelectedCategoryName] = useState(categoryName);

    const handleSelectCategory = (categoryName: string, categoryId: string) => {
        setSelectedCategoryName(categoryName);
        setCategoryID(categoryId);
    };

    const handleSave = () => {
        onSave({ game_id: categoryID, game_name: selectedCategoryName }, onClose);
    };

    return (
        <Modal colorScheme='whiteAlpha' onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ChangeCategory currentCategory={{ label: categoryName, value: categoryId, image: '' }} handleSelectCategory={handleSelectCategory} />
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