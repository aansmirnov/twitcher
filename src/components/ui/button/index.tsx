import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'xl' | 'm' | 's';

type ButtonProps = {
    children: ReactNode;
    onClick: VoidFunction;
    variant?: ButtonVariant;
    className?: string;
    size?: ButtonSize;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = (props: ButtonProps) => {
    const {
        children,
        variant = 'primary',
        className,
        onClick,
        size = 'm',
        ...rest
    } = props;

    const getVariant = (variant: ButtonVariant) => {
        switch (variant) {
            case 'primary': {
                return 'bg-purple-500 hover:bg-purple-400';
            }
            case 'secondary': {
                return 'bg-gray-500 hover:bg-gray-400';
            }
        }
    };
    const getSize = (size: ButtonSize) => {
        switch (size) {
            case 'm': {
                return 'py-2 px-4';
            }
            case 'xl': {
                return 'p-4';
            }

            case 's': {
                return 'p-2';
            }
        }
    };

    const classNames = clsx('text-white text-sm rounded-lg transition duration-150 ease-out hover:ease-in', getSize(size), getVariant(variant), className);

    return (
        <button { ...rest } onClick={onClick} className={classNames}>{children}</button>
    );
};