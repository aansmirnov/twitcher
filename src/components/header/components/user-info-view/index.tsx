import { Fragment } from 'react';
import { UseChannelInformationReturnType, useVisibilityState } from 'src/hooks';
import { ChannelInformation, UpdateChannelInformationIn, User } from 'src/types';
import { EditCategoryPopup, EditTitlePopup } from './components';
import { Avatar, Flex, Tag, Text } from '@chakra-ui/react';
import { VerifiedPartnerIcon } from 'src/icons';

type UserInfoViewProps = {
    currentUser: User;
    currentUserChannelInfo: ChannelInformation;
} & Pick<UseChannelInformationReturnType, 'updateChannelInformation'>

export const UserInfoView = ({ currentUser, currentUserChannelInfo, updateChannelInformation }: UserInfoViewProps) => {
    const { profile_image_url, display_name, broadcaster_type } = currentUser;
    const { tags, title, game_name, game_id } = currentUserChannelInfo;
    const hasTags = tags.length > 0;

    const [isEditTitlePopupVisible, { show: showEditTitlePopup, hide: hideEditTitlePopup }] = useVisibilityState();
    const [isEditCategoryPopupVisible, { show: showEditCategoryPopup, hide: hideEditCategoryPopup }] = useVisibilityState();

    const handleUpdateChannel = (body: UpdateChannelInformationIn, callback: VoidFunction) => {
        updateChannelInformation(body, callback);
    };

    return (
        <Fragment>
            <Flex gap={3}>
                {/** TODO: When stream goes live, change ring color to accent. */}
                <Avatar name={display_name} src={profile_image_url} size='xl' borderWidth='3px' borderColor='gray.400' />
                <Flex direction='column'>
                    <Flex gap={1} mb={2}>
                        <Text color='white' fontSize='xl' as='b' fontWeight='semibold'>{display_name}</Text>
                        { broadcaster_type === 'partner' && <VerifiedPartnerIcon mt='6px' color='purple.500' w={7} h={7} /> }
                    </Flex>
                    <Flex direction='column'>
                        <Text
                            onClick={showEditTitlePopup}
                            w='fit-content'
                            fontSize='sm'
                            color='white'
                            fontWeight='semibold'
                            cursor='pointer'
                            _hover={{ color: 'gray.300' }}>
                            {title}
                        </Text>
                        <Text
                            onClick={showEditCategoryPopup}
                            w='fit-content'
                            fontSize='sm'
                            color='purple.300'
                            cursor='pointer'
                            _hover={{ color: 'purple.400' }}>
                            {game_name || 'Search for a category'}
                        </Text>
                        { hasTags && (
                            <Flex gap={1} mt={2} wrap='wrap'>
                                { tags.map((it, index) => (
                                    <Tag borderRadius='full' bg='gray.700' color='white' fontWeight='semibold' key={index}>{it}</Tag>
                                )) }
                            </Flex>
                        ) }
                    </Flex>
                </Flex>
            </Flex>

            {isEditTitlePopupVisible && (
                <EditTitlePopup
                    isOpen={isEditTitlePopupVisible}
                    onSave={handleUpdateChannel}
                    title={title}
                    onClose={hideEditTitlePopup}
                />
            )}
            {isEditCategoryPopupVisible && (
                <EditCategoryPopup
                    isOpen={isEditCategoryPopupVisible}
                    onSave={handleUpdateChannel}
                    categoryName={game_name}
                    categoryId={game_id}
                    onClose={hideEditCategoryPopup}
                />
            )}
        </Fragment>
    );
};
