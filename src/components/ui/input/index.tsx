import { forwardRef } from 'react';
import { CloseIcon } from 'src/icons';
import clsx from 'clsx';

type InputProps = {
    clearable?: boolean;
    onClear?: VoidFunction;
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>

export const Input = forwardRef(({ onChange, onClear, value, autoFocus = false, type = 'text', className, clearable = false, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const getPaddings = () => clearable ? 'py-2.5 pl-2.5 pr-[32px]' : 'p-2.5';
    const classNames = clsx('border-2 border-gray-400 bg-gray-100 text-black text-base rounded-lg w-full focus:outline-none focus:border-gray-600 focus:bg-gray-200', getPaddings(), className);
    return (
        <div className='group relative'>
            <input
                ref={ref}
                value={value}
                onChange={onChange}
                // It's ok!
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                type={type}
                {...rest}
                className={classNames} />
            { clearable && <CloseIcon onClick={onClear} className='absolute top-[15px] right-[10px] w-5 h-5 hover:cursor-pointer' /> }
        </div>
    );
});