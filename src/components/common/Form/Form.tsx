import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const Form = (props: Props) => {
    const { children } = props
    return (
        <div className="mb-1">
            {children}
        </div>
    )
}
