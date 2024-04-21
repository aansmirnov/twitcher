import { useToast as useChakraToast } from '@chakra-ui/react';

export type RenderToastParams = {
    type: 'ban' | 'vip' | 'mod';
    action: 'add' | 'delete';
    userName?: string;
    success?: boolean;
};

const TOAST_PROPS = {
    duration: 3000,
    isClosable: true,
};
const ERROR_TEXT = 'Something went wrong!';

export const useToast = () => {
    const toast = useChakraToast();

    const renderToast = ({
        type,
        action,
        userName,
        success = true,
    }: RenderToastParams) => {
        let description = ERROR_TEXT;
        const isAddAction = action === 'add';

        if (success) {
            if (type === 'ban') {
                description = `You have ${
                    isAddAction ? 'banned' : 'removed ban on'
                } ${userName}`;
            } else {
                description = `You have ${
                    isAddAction
                        ? `granted ${type} privileges to`
                        : `removed ${type} privileges on`
                } ${userName}`;
            }
        }

        const status = success ? 'success' : 'error';

        toast({
            description,
            status,
            ...TOAST_PROPS,
        });
    };

    return {
        renderToast,
    };
};
