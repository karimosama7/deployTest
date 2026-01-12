import React from 'react';
import { cn } from '../../lib/utils';

export type StatusType = 'Active' | 'Inactive' | 'Pending' | 'Success' | 'Warning' | 'Error';

interface StatusBadgeProps {
    status: string;
    type?: StatusType;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type, className }) => {

    // Auto-detect type from status text if not provided
    let badgeType = type;
    if (!badgeType) {
        if (['Active', 'Success', 'Completed', 'نشط', 'مكتمل'].includes(status)) badgeType = 'Success';
        else if (['Inactive', 'Failed', 'Closed', 'غير نشط', 'فشل'].includes(status)) badgeType = 'Error';
        else if (['Pending', 'Late', 'قيد الانتظار', 'متأخر'].includes(status)) badgeType = 'Warning';
        else badgeType = 'Pending'; // Default
    }

    const styles = {
        Success: 'bg-green-100 text-green-800',
        Error: 'bg-red-100 text-red-800',
        Warning: 'bg-yellow-100 text-yellow-800',
        Pending: 'bg-gray-100 text-gray-800',
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-red-100 text-red-800',
    };

    return (
        <span className={cn(
            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
            styles[badgeType || 'Pending'],
            className
        )}>
            {status}
        </span>
    );
};
