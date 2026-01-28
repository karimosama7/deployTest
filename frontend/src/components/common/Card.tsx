import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <div
            className={cn("bg-white shadow rounded-lg", className)}
            {...props}
        >
            <div className="px-4 py-5 sm:p-6">
                {children}
            </div>
        </div>
    );
};
