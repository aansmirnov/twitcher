import { Button, Popup } from 'src/components/ui';

type EditGamePopupProps = {
    onClose: VoidFunction;
}

export const EditGamePopup = ({ onClose }: EditGamePopupProps) => {
    return (
        <Popup onClose={onClose}>
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold text-2xl'>Change game</h2>
                <select />
                <div className='flex gap-2'>
                    <Button variant='primary' onClick={onClose}>Save</Button>
                    <Button variant='secondary' onClick={onClose}>Close</Button>
                </div>
            </div>
        </Popup>
    );
};