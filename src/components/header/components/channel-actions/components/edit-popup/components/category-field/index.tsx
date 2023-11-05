import {
    ChangeCategory,
    ChangeCategoryProps,
} from 'src/components/header/components/change-category';
import { FieldName } from '../field-name';
import { Flex } from '@chakra-ui/react';

export const CategoryField = ({
    currentCategory,
    handleSelectCategory,
}: ChangeCategoryProps) => (
    <Flex gap={2} direction='column'>
        <FieldName text='Category' />
        <ChangeCategory
            handleSelectCategory={handleSelectCategory}
            currentCategory={currentCategory}
        />
    </Flex>
);
