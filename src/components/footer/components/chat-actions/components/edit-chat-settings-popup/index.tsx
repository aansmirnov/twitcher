import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    Text,
} from '@chakra-ui/react';
import { ChatSettings, UpdateChatSettingsIn } from 'src/types';
import { Select } from 'chakra-react-select';
import {
    FOLLOWER_MODE_DURATION_VALUES,
    FOLLOWER_MODE_DURATION_LABEL_BY_VALUE,
    SLOW_MODE_LABEL_BY_VALUES,
    SLOW_MODE_VALUES,
} from './select-values';

type EditChatSettingsProps = {
    onClose: VoidFunction;
    isOpen: boolean;
    chatSettings: ChatSettings;
    handleUpdateChatSettings: (body: UpdateChatSettingsIn['body']) => void;
};

export const EditChatSettings = ({
    onClose,
    isOpen,
    chatSettings,
    handleUpdateChatSettings,
}: EditChatSettingsProps) => {
    const onChange = (body: UpdateChatSettingsIn['body']) => {
        handleUpdateChatSettings(body);
    };

    const changeFollowerMode = (value?: string | number) => {
        const isFollowerMode = typeof value === 'number';
        onChange({
            follower_mode: isFollowerMode,
            follower_mode_duration: isFollowerMode ? value : null,
        });
    };

    const changeSlowMode = (value?: string | number) => {
        const isFollowerMode = typeof value === 'number';
        onChange({
            slow_mode: isFollowerMode,
            slow_mode_wait_time: isFollowerMode ? value : null,
        });
    };

    return (
        <Modal
            colorScheme='whiteAlpha'
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Chat Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDirection='column' gap={4}>
                        <Box>
                            <Text fontWeight='medium'>Followers-Only Chat</Text>
                            <Select
                                onChange={(e) => changeFollowerMode(e?.value)}
                                maxMenuHeight={240}
                                value={{
                                    value:
                                        chatSettings.follower_mode_duration ??
                                        '',
                                    label: FOLLOWER_MODE_DURATION_LABEL_BY_VALUE[
                                        chatSettings.follower_mode_duration ??
                                            ''
                                    ],
                                }}
                                options={FOLLOWER_MODE_DURATION_VALUES}
                                variant='filled'
                            />
                        </Box>
                        <Box>
                            <Text fontWeight='medium'>Slow Mode</Text>
                            <Select
                                onChange={(e) => changeSlowMode(e?.value)}
                                maxMenuHeight={240}
                                value={{
                                    value:
                                        chatSettings.slow_mode_wait_time ?? '',
                                    label: SLOW_MODE_LABEL_BY_VALUES[
                                        chatSettings.slow_mode_wait_time ?? ''
                                    ],
                                }}
                                options={SLOW_MODE_VALUES}
                                variant='filled'
                            />
                        </Box>
                        <Grid templateColumns='repeat(2, 1fr)'>
                            <GridItem>Emotes-Only Chat</GridItem>
                            <GridItem>
                                <Switch
                                    isChecked={chatSettings.emote_mode}
                                    onChange={(e) =>
                                        onChange({
                                            emote_mode: e.target.checked,
                                        })
                                    }
                                />
                            </GridItem>
                        </Grid>
                        <Grid templateColumns='repeat(2, 1fr)'>
                            <GridItem>Subscriber-Only Chat</GridItem>
                            <GridItem>
                                <Switch
                                    isChecked={chatSettings.subscriber_mode}
                                    onChange={(e) =>
                                        onChange({
                                            subscriber_mode: e.target.checked,
                                        })
                                    }
                                />
                            </GridItem>
                        </Grid>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Flex gap={2}>
                        <Button colorScheme='gray' onClick={onClose}>
                            Close
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
