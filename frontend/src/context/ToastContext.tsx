import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../lib/utils';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextType {
    addToast: (message: string, type: ToastType, duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((message: string, type: ToastType, duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { id, message, type, duration };

        setToasts((prev) => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm pointer-events-none sm:right-auto sm:left-0 sm:items-start" dir="ltr"> {/* Fixed to display on bottom-left for LTR/RTL consistency or keep right if preferred */}
                <div className="flex flex-col gap-2 w-full items-end sm:items-start">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={cn(
                                "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white ring-1 ring-black ring-opacity-5 shadow-lg transform transition-all duration-300 ease-in-out",
                                "flex items-center p-4 gap-3 border-l-4", // border-l-4 for left accent
                                toast.type === 'success' && "border-green-500",
                                toast.type === 'error' && "border-red-500",
                                toast.type === 'warning' && "border-yellow-500",
                                toast.type === 'info' && "border-blue-500",
                            )}
                        >
                            <div className="flex-shrink-0">
                                {toast.type === 'success' && <CheckCircle className="h-6 w-6 text-green-400" />}
                                {toast.type === 'error' && <AlertCircle className="h-6 w-6 text-red-400" />}
                                {toast.type === 'warning' && <AlertTriangle className="h-6 w-6 text-yellow-400" />}
                                {toast.type === 'info' && <Info className="h-6 w-6 text-blue-400" />}
                            </div>
                            <div className="flex-1 w-0">
                                <p className="text-sm font-medium text-gray-900">{toast.message}</p>
                            </div>
                            <div className="flex-shrink-0 flex items-center">
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Close</span>
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
