import { useState } from 'react';

type UseVisibilityStateReturnType = [
    boolean,
    {
        show: VoidFunction;
        hide: VoidFunction;
        toggle: VoidFunction;
    },
];

export const useVisibilityState = (
    value = false,
): UseVisibilityStateReturnType => {
    const [isVisible, setIsVisible] = useState(value);

    const hide = () => setIsVisible(false);
    const show = () => setIsVisible(true);
    const toggle = () => setIsVisible((prev) => !prev);

    return [isVisible, { show, hide, toggle }];
};
