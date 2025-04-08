import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../app/service/globalSlice'
import type { User } from '../../types/user.type'
import { Link } from 'react-router'

export const Card = ({
    name,
    id,
    username,
    email,
    address
}: User) => {
    const theme = useAppSelector(selectTheme)
    const cardStyles = theme === 'dark' 
        ? 'bg-gray-800 text-gray-100' 
        : 'bg-white text-gray-800'
        
    const textStyles = theme === 'dark' 
        ? 'text-gray-300' 
        : 'text-gray-600'
        
    const titleStyles = theme === 'dark' 
        ? 'text-white' 
        : 'text-gray-900'
        
    const labelStyles = theme === 'dark' 
        ? 'text-gray-200 font-semibold' 
        : 'text-gray-700 font-semibold'
        
    const linkStyles = theme === 'dark' 
        ? 'text-blue-400 hover:text-blue-300' 
        : 'text-blue-600 hover:text-blue-800'

    return (
        <div className={`max-w-sm w-[400px] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-102 hover:shadow-xl ${cardStyles}`}>
            <div className="px-6 py-4">
                <div className={`font-bold text-xl mb-2 ${titleStyles}`}>
                    {name}
                </div>
                <p className={`text-sm mb-1 ${textStyles}`}>
                    <span className={labelStyles}>ID:</span> {id}
                </p>
                <p className={`text-sm mb-1 ${textStyles}`}>
                    <span className={labelStyles}>Username:</span> {username}
                </p>
                <p className={`text-sm mb-1 ${textStyles}`}>
                    <span className={labelStyles}>Email:</span> {email}
                </p>
                <p className={`text-sm mb-1 ${textStyles}`}>
                    <span className={labelStyles}>City:</span> {address.city}
                </p>
                <div className={`mt-4 ${linkStyles}`}>
                    <Link to={`/user/${id}`}>More Info</Link>
                </div>
            </div>
        </div>
    )
}