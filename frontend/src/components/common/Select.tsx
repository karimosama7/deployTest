import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
    error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => {
    return (
        <div>
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <select
                    {...props}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                >
                    <option value="">اختر...</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};
