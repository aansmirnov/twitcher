import { useEffect, useState } from 'react';

type UseDebounceParams<T> = {
    value: T;
    delay?: number;
};

export const useDebounce = <T>({
    value,
    delay = 300,
}: UseDebounceParams<T>): T => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    });

    return debounceValue;
};
