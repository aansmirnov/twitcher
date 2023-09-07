import { ReactNode } from 'react';
import { CloseIcon } from 'src/icons';

type PopupProps = {
    children: ReactNode;
    onClose: VoidFunction;
}

export const Popup = ({ children, onClose }: PopupProps) => (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div id='overlay' className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform rounded-[20px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <CloseIcon onClick={onClose} className='w-6 h-6 text-white absolute right-[-30px] top-[-30px] hover:cursor-pointer' />
                    <div className="bg-white px-7 py-9 rounded-[20px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);