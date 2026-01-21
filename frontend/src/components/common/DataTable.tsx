import React from 'react';
import { cn } from '../../lib/utils';
import { Edit, Trash2 } from 'lucide-react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
    width?: string; // Optional width like 'w-48' or 'w-1/4'
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    actions?: (item: T) => React.ReactNode;
    isLoading?: boolean;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    onEdit,
    onDelete,
    actions,
    isLoading,
}: DataTableProps<T>) {
    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((col, idx) => (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className={cn(
                                                "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                col.className,
                                                col.width
                                            )}
                                        >
                                            {col.header}
                                        </th>
                                    ))}
                                    {(onEdit || onDelete || actions) && (
                                        <th 
                                            scope="col" 
                                            className="w-44 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            الإجراءات
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        {columns.map((col, idx) => (
                                            <td
                                                key={idx}
                                                className={cn(
                                                    "px-4 py-4 whitespace-nowrap text-sm text-gray-700",
                                                    col.className,
                                                    col.width
                                                )}
                                            >
                                                {typeof col.accessor === 'function'
                                                    ? col.accessor(item)
                                                    : (item[col.accessor] as React.ReactNode)}
                                            </td>
                                        ))}
                                        {(onEdit || onDelete || actions) && (
                                            <td className="w-44 px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-start gap-1">
                                                    {/* Custom actions first */}
                                                    {actions && actions(item)}
                                                    
                                                    {/* Edit button */}
                                                    {onEdit && (
                                                        <button
                                                            onClick={() => onEdit(item)}
                                                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                            title="تعديل"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                    
                                                    {/* Delete button */}
                                                    {onDelete && (
                                                        <button
                                                            onClick={() => onDelete(item)}
                                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="حذف"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                <p className="text-lg">لا توجد بيانات</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
