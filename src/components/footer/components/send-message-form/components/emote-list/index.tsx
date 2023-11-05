import {
    Tooltip,
    Image,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Flex,
} from '@chakra-ui/react';
import { EmoteIcon } from 'src/icons';
import { useChatStoreContext } from 'src/stores';
import styles from './styles.module.css';

type EmoteListProps = {
    onSelectEmote: (emote: string) => void;
};

export const EmoteList = ({ onSelectEmote }: EmoteListProps) => {
    const { emotes } = useChatStoreContext();

    return (
        <div className={styles.wrapper}>
            <Popover isLazy placement='top-start'>
                <PopoverTrigger>
                    <EmoteIcon pb={2} w={6} h={6} />
                </PopoverTrigger>
                <PopoverContent>
                    <Flex p={2} gap={4} wrap='wrap'>
                        {emotes.map((it) => (
                            <Tooltip
                                key={`${it.name}-${it.id}`}
                                borderRadius='lg'
                                placement='top'
                                label={it.name}
                            >
                                <Image
                                    onClick={() => onSelectEmote(it.name)}
                                    w='20px'
                                    h='20px'
                                    cursor='pointer'
                                    src={it.images.url_1x}
                                />
                            </Tooltip>
                        ))}
                    </Flex>
                </PopoverContent>
            </Popover>
        </div>
    );
};
