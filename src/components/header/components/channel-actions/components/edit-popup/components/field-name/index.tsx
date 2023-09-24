import { Text } from '@chakra-ui/react';

type FieldNameProps = {
    text: string;
}

export const FieldName = ({ text }: FieldNameProps) => (
    <Text>{text}</Text>
);