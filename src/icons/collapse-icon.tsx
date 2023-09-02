import { SVGProps } from 'react';

type CollapseIconProps = SVGProps<SVGSVGElement>;

export const CollapseIcon = (props: CollapseIconProps) => (
    <svg
        enableBackground="0 0 32 32"
        viewBox="0 0 32 32"
        stroke="currentColor"
        {...props}
    >
        <line stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" x1="22" x2="2" y1="3" y2="3" />
        <polygon fill="none" points="12,22 18,14 14,14 14,6 10,6 10,14 6,14 "/>
    </svg>
);