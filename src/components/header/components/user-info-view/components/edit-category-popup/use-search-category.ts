import { useEffect, useState } from 'react';
import { apiHelix } from 'src/api';
import { useDebounce } from 'src/hooks';
import { Category } from 'src/types';

type UseSearchCategoryReturnType = {
    handleChangeTitle: (value: string) => void;
    categoryTitle: string;
    categories: Category[];
    hasCategories: boolean;
}

export const useSearchCategory = (value: string): UseSearchCategoryReturnType => {
    const [categoryTitle, setCategoryTitle] = useState(value);
    const [categories, setCategories] = useState<Category[]>([]);
    const debouncedValue = useDebounce({
        value: categoryTitle,
        delay: 500
    });

    const handleChangeTitle = (value: string) => {
        setCategoryTitle(value);
    };

    useEffect(() => {
        if (debouncedValue === '' || debouncedValue.trim().length === 0) {
            return;
        }


        apiHelix.getCategories({ query: debouncedValue }).then(({ data }) => setCategories(data));
    }, [debouncedValue]);

    return {
        handleChangeTitle,
        categoryTitle,
        categories,
        hasCategories: categories.length > 0
    };
};