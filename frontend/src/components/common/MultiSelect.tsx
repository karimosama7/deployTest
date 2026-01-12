import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { X, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    label: string;
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    error?: string;
    placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    label,
    options,
    value,
    onChange,
    error,
    placeholder = "اختر..."
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (optionValue: string) => {
        const newValue = value.includes(optionValue)
            ? value.filter(v => v !== optionValue)
            : [...value, optionValue];
        onChange(newValue);
    };

    const removeValue = (e: React.MouseEvent, optionValue: string) => {
        e.stopPropagation();
        onChange(value.filter(v => v !== optionValue));
    };

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div
                className="min-h-[38px] cursor-pointer bg-white border border-gray-300 rounded-md py-1 px-3 flex flex-wrap gap-1 items-center focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value.length === 0 && (
                    <span className="text-gray-500 text-sm">{placeholder}</span>
                )}

                {value.map(v => {
                    const option = options.find(o => o.value === v);
                    return (
                        <span key={v} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                            {option?.label}
                            <button
                                type="button"
                                onClick={(e) => removeValue(e, v)}
                                className="mr-1 inline-flex text-indigo-500 focus:outline-none"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    );
                })}
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                "cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50",
                                value.includes(option.value) ? "text-indigo-900 font-semibold" : "text-gray-900"
                            )}
                            onClick={() => toggleOption(option.value)}
                        >
                            <span className="block truncate">{option.label}</span>
                            {value.includes(option.value) && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                    <Check className="h-4 w-4" />
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};
