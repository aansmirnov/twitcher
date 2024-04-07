import { useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import { useDebounce } from 'src/hooks';
import { Category, Option } from 'src/types';

type CategoriesAsOption = Option & { image: string };

type UseSearchCategoryReturnType = {
    handleChangeTitle: (value: string) => void;
    handleChange: (value: CategoriesAsOption) => void;
    state: CategoriesAsOption;
    loading: boolean;
    categories: CategoriesAsOption[];
};

export const useSearchCategory = (
    category: CategoriesAsOption,
): UseSearchCategoryReturnType => {
    const [state, setState] = useState(category);
    const [searchValue, setSearchValue] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce({
        value: searchValue,
        delay: 500,
    });

    const handleChangeTitle = (value: string) => {
        setSearchValue(value);
    };

    const handleChange = (value: CategoriesAsOption) => setState(value);

    useEffect(() => {
        if (debouncedValue === '' || debouncedValue.trim().length === 0) {
            return;
        }

        setLoading(true);

        apiHelix
            .getCategories({ query: debouncedValue })
            .then(({ data }) => setCategories(data))
            .finally(() => setLoading(false));
    }, [debouncedValue]);

    return {
        handleChangeTitle,
        handleChange,
        state,
        loading,
        categories: categories.map((it) => ({
            value: it.id,
            label: it.name,
            image: it.box_art_url,
        })),
    };
};
