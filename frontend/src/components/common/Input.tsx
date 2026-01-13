import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

import { Eye, EyeOff } from "lucide-react"

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={inputType}
                        className={cn(
                            "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                            error && "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {type === 'password' && (
                        <button
                            type="button"
                            className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                                <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
