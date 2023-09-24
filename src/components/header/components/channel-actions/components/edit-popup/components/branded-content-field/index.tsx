import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { FieldName } from '../field-name';

type BrandedContentFieldProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const BrandedContentField = ({ onChange, checked }: BrandedContentFieldProps) => (
    <Flex flexDirection='column' gap={1}>
        <FieldName text='Branded Content'/>
        <Checkbox alignItems='self-start' checked={checked} onChange={(e) => onChange(e.target.checked)}>
            <Text lineHeight='15px' fontSize='xs' fontWeight='medium' color='black'>Let viewers know if your stream features branded content. This includes paid product placement, endorsement, or other commercial relationships.</Text>
        </Checkbox>
    </Flex>
);