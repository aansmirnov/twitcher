type CenteredWrapperProps = {
    children: React.ReactNode;
}

export const CenteredWrapper = ({ children }: CenteredWrapperProps) => (
    <div className='flex items-center justify-center h-screen'>
        {children}
    </div>
);