import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info' | 'success';
    isLoading?: boolean;
    isAlert?: boolean; // If true, only shows Confirm (OK) button
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'تأكيد',
    cancelText = 'إلغاء',
    type = 'warning',
    isLoading = false,
    isAlert = false
}) => {

    // Determine Icon and Color
    let Icon = AlertTriangle;
    let iconColor = 'text-yellow-500';
    let buttonVariant: 'primary' | 'danger' | 'secondary' = 'primary';

    switch (type) {
        case 'danger':
            Icon = AlertTriangle;
            iconColor = 'text-red-500';
            buttonVariant = 'danger';
            break;
        case 'warning':
            Icon = AlertTriangle;
            iconColor = 'text-yellow-500';
            buttonVariant = 'primary'; // Or warning if available
            break;
        case 'success':
            Icon = CheckCircle;
            iconColor = 'text-green-500';
            buttonVariant = 'primary';
            break;
        case 'info':
            Icon = Info;
            iconColor = 'text-blue-500';
            buttonVariant = 'primary';
            break;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col items-center justify-center p-4">
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 ${iconColor} bg-opacity-20`}>
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>

                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {message}
                </p>

                <div className="flex justify-center gap-3 w-full">
                    {!isAlert && (
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            {cancelText}
                        </Button>
                    )}
                    <Button
                        variant={buttonVariant}
                        onClick={onConfirm || onClose}
                        isLoading={isLoading}
                        className="min-w-[100px]"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
