import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../app/service/globalSlice'

type Props = {
    type?: 'default' | 'success' | 'danger'
    isLoading?: boolean
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export const Button = ({
    type = 'default',
    isLoading = false,
    children,
    className = '',
    onClick
}: Props) => {
    const theme = useAppSelector(selectTheme)
    
    const getButtonClasses = (): string => {
        const base = 'px-4 py-2 rounded text-white transition hover:shadow-xl'
        if (theme === 'dark') {
            switch (type) {
                case 'success': return `${base} bg-green-600 hover:bg-green-700`
                case 'danger': return `${base} bg-red-600 hover:bg-red-700`
                default: return `${base} bg-gray-600 hover:bg-gray-800`
            }
        } else {
            switch (type) {
                case 'success': return `${base} bg-green-500 hover:bg-green-600`
                case 'danger': return `${base} bg-red-500 hover:bg-red-600`
                default: return `${base} bg-blue-500 hover:bg-blue-600`
            }
        }
    }

    return (
        <button
            className={`${getButtonClasses()} ${className}`}
            disabled={isLoading}
            onClick={onClick}
        >
            {isLoading ? '...' : children}
        </button>
    )
}