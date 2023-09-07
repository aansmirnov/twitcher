import { CloseIcon } from 'src/icons';

type TagsListProps = {
    tags: string[];
    withDelete?: boolean;
    onDelete?: (index: number) => void;
}

export const TagsList = ({ tags, withDelete = false, onDelete }: TagsListProps) => (
    <div className='flex flex-wrap gap-1 mt-2'>
        { tags.map((tag, index) => (
            <span key={`${tag} ${index}`} className='text-xs font-semibold text-gray-300 px-2 py-1 bg-zinc-700 rounded-full'>
                {tag}
                { withDelete && <CloseIcon className='w-3 h-3 ml-1 inline-block text-gray-300 hover:cursor-pointer' onClick={() => onDelete?.(index)} /> }
            </span>
        ))}
    </div>
);