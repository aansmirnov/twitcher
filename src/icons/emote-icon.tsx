import { createIcon } from '@chakra-ui/react';
import { Fragment } from 'react';

export const EmoteIcon = createIcon({
    displayName: 'EmoteIcon',
    viewBox: '0 0 20 20',
    path: (
        <Fragment>
            <path d='M7 11a1 1 0 100-2 1 1 0 000 2zM14 10a1 1 0 11-2 0 1 1 0 012 0zM10 14a2 2 0 002-2H8a2 2 0 002 2z' />
            <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z'
                clipRule='evenodd'
            />
        </Fragment>
    ),
});
