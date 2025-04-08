import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../app/service/globalSlice'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label?: string
    error?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
}

export const Input = ({ 
    className = '', 
    label, 
    error,
    onChange,
    value,
    ...props 
}: InputProps) => {
    const theme = useAppSelector(selectTheme)

    const themeStyles = theme === 'dark' ? {
        input: 'bg-gray-800 text-white border-gray-600 focus:border-gray-500 focus:ring-blue-500 placeholder-gray-400',
        label: 'text-gray-300',
        error: 'text-red-400'
    } : {
        input: 'bg-white text-gray-900 border-blue-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
        label: 'text-gray-700',
        error: 'text-red-600'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className={`block mb-2 text-sm font-medium ${themeStyles.label}`}>
                    {label}
                </label>
            )}
            
            <input
                className={`w-full sm:w-xs px-4 py-2 text-sm rounded-lg border ${themeStyles.input} transition-colors duration-200 ${
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                onChange={handleChange}
                value={value}
                {...props}
            />
            
            {error && (
                <p className={`mt-1 text-sm ${themeStyles.error}`}>
                    {error}
                </p>
            )}
        </div>
    )
}