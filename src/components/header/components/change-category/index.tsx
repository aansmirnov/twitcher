import { Select } from 'chakra-react-select';
import { useSearchCategory } from './use-search-category';
import { Flex, Img, Text } from '@chakra-ui/react';
import { Option } from 'src/types';

export type ChangeCategoryProps = {
    handleSelectCategory: (categoryName: string, categoryId: string) => void;
    currentCategory: Option & { image: string; };
}

export const ChangeCategory = ({ handleSelectCategory, currentCategory }: ChangeCategoryProps) => {
    const { state, handleChangeTitle, categories, hasCategories, handleChange } = useSearchCategory(currentCategory);

    return (
        <Select
            variant='filled'
            focusBorderColor='purple.500'
            value={state}
            onInputChange={handleChangeTitle}
            onChange={(e): void => {
                // '0' for delete category
                handleChange({ value: e?.value ?? '0', label: e?.label ?? '', image: e?.image ?? '' });
                handleSelectCategory(e?.label ?? '', e?.value?.toString() ?? '');
            }}
            noOptionsMessage={() => hasCategories ? 'Searching...' : 'No results found'}
            options={categories}
            formatOptionLabel={(option) => (
                <Flex alignItems='center' gap={2}>
                    { option.image && <Img w={8} h={10} src={option.image} /> }
                    <Text noOfLines={2}>{option.label}</Text>
                </Flex>
            )}
            isSearchable
            isClearable
            placeholder='Search for a category'
            maxMenuHeight={240}
        />
    );
};
