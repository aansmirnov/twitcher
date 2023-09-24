import { Center } from '@chakra-ui/react';

type CenteredWrapperProps = {
    children: React.ReactNode;
}

export const CenteredWrapper = ({ children }: CenteredWrapperProps) => (
    <Center h='inherit'>
        {children}
    </Center>
);