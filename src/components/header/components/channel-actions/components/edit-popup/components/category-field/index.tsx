import { ChangeCategory, ChangeCategoryProps } from 'src/components/header/components/change-category';
import { FieldName } from '../field-name';

export const CategoryField = ({ categoryName, clearable, onClear, handleSelectCategory }: ChangeCategoryProps) => (
    <div className='flex flex-col gap-1 z-50'>
        <FieldName text="Category" />
        <ChangeCategory
            clearable={clearable}
            onClear={onClear}
            handleSelectCategory={handleSelectCategory}
            categoryName={categoryName} />
    </div>
);