import { useRef, MouseEvent, ChangeEvent, useLayoutEffect } from 'react';
import { Input } from 'src/components/ui';
import { useSearchCategory } from './use-search-category';
import { useVisibilityState } from 'src/hooks';

type ChangeCategoryProps = {
    categoryName: string;
    handleSelectCategory: (categoryName: string, categoryId: string) => void;
}

export const ChangeCategory = ({ categoryName, handleSelectCategory }: ChangeCategoryProps) => {
    const { categoryTitle, handleChangeTitle, categories, hasCategories } = useSearchCategory(categoryName);
    const [isCategoryListVisible, { show, hide }] = useVisibilityState();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputClick = (e: MouseEvent<HTMLInputElement> ) => {
        e.stopPropagation();
        show();
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        handleChangeTitle(e.target.value);
        if (!isCategoryListVisible) {
            show();
        }
    };

    const handleSelect = (categoryName: string, categoryId: string): void => {
        handleChangeTitle(categoryName);
        handleSelectCategory(categoryName, categoryId);
    };

    useLayoutEffect(() => {
        const onClickOutside = (event: Event) => {
            const taget = event.target as Element;

            if (isCategoryListVisible && taget && !inputRef.current?.contains(taget)) {
                hide();
            }
        };

        window.addEventListener('click', onClickOutside);
        return () => {
            window.removeEventListener('click', onClickOutside);
        };
    }, [hide, isCategoryListVisible]);

    return (
        <div className='group relative'>
            <Input ref={inputRef} onClick={handleInputClick} value={categoryTitle} onChange={handleChangeInput} />
            <div className='absolute w-full max-h-[300px] top-[52px] left-0 bg-white rounded-xl shadow shadow-gray-500/50 overflow-y-scroll hover:cursor-pointer'>
                { hasCategories && isCategoryListVisible && categories.map((category) => (
                    <div onClick={() => handleSelect(category.name, category.id)} key={category.id} className='flex p-4 gap-2 items-center hover:bg-gray-200'>
                        <img className='w-8 h-10' src={category.box_art_url} alt={category.name} />
                        <span className='truncate'>{category.name}</span>
                    </div>
                )) }
            </div>
        </div>
    );
};
