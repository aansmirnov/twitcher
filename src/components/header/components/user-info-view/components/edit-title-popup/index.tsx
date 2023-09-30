import { useState } from 'react';
import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';
import { TITLE_LIMIT } from 'src/consts';
import { UpdateChannelInformationIn } from 'src/types';

type EditTitlePopupProps = {
    onClose: VoidFunction;
    onSave: (body: UpdateChannelInformationIn, callback: VoidFunction) => void;
    title: string;
    isOpen: boolean;
}

export const EditTitlePopup = ({ onClose, title, onSave, isOpen }: EditTitlePopupProps) => {
    const [value, setValue] = useState(title);
    const titleCount = value.length;

    const handleChangeTitle = (value: string) => {
        if (value.length > TITLE_LIMIT) {
            return;
        }

        setValue(value);
    };

    const handleSave = () => {
        onSave({ title: value }, onClose);
    };

    return (
        <Modal colorScheme='whiteAlpha' onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction='column' gap={1}>
                        <Input focusBorderColor='purple.500' variant='filled' value={value} onChange={(e) => handleChangeTitle(e.target.value)} />
                        <Text fontSize='sm' textAlign='right' color='gray.600'>{titleCount}/{TITLE_LIMIT}</Text>
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