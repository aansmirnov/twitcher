import { FieldName } from '../field-name';

type BrandedContentFieldProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const BrandedContentField = ({ onChange, checked }: BrandedContentFieldProps) => (
    <div className="flex flex-col">
        <FieldName text='Branded Content'/>
        <div className="flex items-start mt-1">
            <input checked={checked} onChange={(e) => onChange(e.target.checked)} type="checkbox" className="w-4 h-4 mt-[3px] border-2 border-gray-400 bg-gray-100 text-black text-base rounded-lg focus:outline-none focus:border-gray-600 focus:bg-gray-200 hover:cursor-pointer" />
            <span className="ml-2 text-xs font-medium text-black">Let viewers know if your stream features branded content. This includes<br/>paid product placement, endorsement, or other commercial relationships.</span>
        </div>
    </div>
);