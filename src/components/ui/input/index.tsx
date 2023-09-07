import { ChangeEventHandler, HTMLInputTypeAttribute, forwardRef } from 'react';

type InputProps = {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    type?: HTMLInputTypeAttribute;
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>

export const Input = forwardRef(({ onChange, value, autoFocus = false, type = 'text', ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <input
            ref={ref}
            value={value}
            onChange={onChange}
            // It's ok!
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            type={type}
            {...rest}
            className="border-2 border-gray-400 bg-gray-100 text-black text-base rounded-lg w-full p-2.5 focus:outline-none focus:border-gray-600 focus:bg-gray-200" />
    );
});