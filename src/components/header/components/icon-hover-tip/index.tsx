import clsx from 'clsx';
import { ReactNode } from 'react';

type IconHoverTipProps = {
    children: ReactNode;
    text: string;
    className?: string;
}

export const IconHoverTip = ({ children, text, className }: IconHoverTipProps) => {
    const classNames = clsx('hidden absolute text-white text-sm rounded-md left-[-5px] group-hover:bg-black group-hover:p-2 group-hover:block', className);

    return (
        <div className='group relative'>
            {children}
            <div className={classNames}>
                {text}
            </div>
        </div>
    );
};