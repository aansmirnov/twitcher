type FieldNameProps = {
    text: string;
}

export const FieldName = ({ text }: FieldNameProps) => (
    <span className="text-ms font-semibold text-black">{text}</span>
);