import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Option {
    value: string;
    label: string;
}

interface SearchableMultiSelectProps {
    label?: string;
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    className?: string;
}

export const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = 'اختر...',
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOptions = options.filter(opt => value.includes(opt.value));

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (optValue: string) => {
        if (value.includes(optValue)) {
            onChange(value.filter(v => v !== optValue));
        } else {
            onChange([...value, optValue]);
        }
    };

    const handleRemove = (optValue: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter(v => v !== optValue));
    };

    return (
        <div className={cn('relative', className)} ref={containerRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            
            <div
                className={cn(
                    'relative w-full border rounded-lg bg-white cursor-pointer transition-all min-h-[42px]',
                    isOpen ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300 hover:border-gray-400'
                )}
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) {
                        setTimeout(() => inputRef.current?.focus(), 100);
                    }
                }}
            >
                <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex-1 flex flex-wrap gap-1">
                        {selectedOptions.length === 0 ? (
                            <span className="text-gray-400">{placeholder}</span>
                        ) : (
                            selectedOptions.map(opt => (
                                <span
                                    key={opt.value}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                                >
                                    {opt.label}
                                    <button
                                        type="button"
                                        onClick={(e) => handleRemove(opt.value, e)}
                                        className="hover:bg-indigo-200 rounded-full p-0.5"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))
                        )}
                    </div>
                    <ChevronDown className={cn(
                        'w-4 h-4 text-gray-400 transition-transform flex-shrink-0 mr-2',
                        isOpen && 'rotate-180'
                    )} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ابحث..."
                                className="w-full pr-8 pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                    
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="px-3 py-4 text-sm text-gray-500 text-center">
                                لا توجد نتائج
                            </div>
                        ) : (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => handleToggle(opt.value)}
                                    className={cn(
                                        'flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-indigo-50 transition-colors',
                                        value.includes(opt.value) && 'bg-indigo-50'
                                    )}
                                >
                                    <span className={value.includes(opt.value) ? 'text-indigo-700 font-medium' : ''}>
                                        {opt.label}
                                    </span>
                                    {value.includes(opt.value) && (
                                        <Check className="w-4 h-4 text-indigo-600" />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
