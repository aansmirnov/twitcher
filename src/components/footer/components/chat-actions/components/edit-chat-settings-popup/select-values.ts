import { Option } from 'src/types';

export const FOLLOWER_MODE_DURATION_VALUES: Option[] = [
    { value: 0, label: '0 minutes (Any followers)' },
    { value: 10, label: '10 minutes (Most used)' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 1440, label: '1 day' },
    { value: 10080, label: '1 week' },
    { value: 43200, label: '1 month' },
    { value: 129600, label: '3 month' },
    { value: '', label: 'OFF (Remove followers-only restriction)' },
];

export const FOLLOWER_MODE_DURATION_LABEL_BY_VALUE: {
    [x: string | number]: string;
} = {
    [0]: '0 minutes (Any followers)',
    [10]: '10 minutes (Most used)',
    [30]: '30 minutes',
    [60]: '1 hour',
    [1440]: '1 day',
    [10080]: '1 week',
    [43200]: '1 month',
    [129600]: '3 month',
    ['']: 'OFF (Remove followers-only restriction)',
};

export const SLOW_MODE_VALUES: Option[] = [
    { value: 3, label: '3 seconds' },
    { value: 5, label: '5 seconds' },
    { value: 10, label: '10 seconds' },
    { value: 20, label: '20 seconds' },
    { value: 30, label: '30 seconds (default)' },
    { value: 60, label: '60 seconds' },
    { value: 120, label: '120 seconds' },
    { value: '', label: 'OFF (Turn off slow mode)' },
];

export const SLOW_MODE_LABEL_BY_VALUES: { [x: string | number]: string } = {
    [3]: '3 seconds',
    [5]: '5 seconds',
    [10]: '10 seconds',
    [20]: '20 seconds',
    [30]: '30 seconds (default)',
    [60]: '60 seconds',
    [120]: '120 seconds',
    ['']: 'OFF (Turn off slow mode)',
};
