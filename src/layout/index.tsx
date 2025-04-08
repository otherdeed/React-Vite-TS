import { Button } from '../components/button'
import { selectTheme, toggleTheme } from '../app/service/globalSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { LuSunMedium } from "react-icons/lu";
import { LuSunMoon } from "react-icons/lu";
type Props = {
    children: React.ReactNode
}
export const Layout = ({
    children
}: Props) => {
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch()
    const ToggleTheme = () => {
        dispatch(toggleTheme())
    }
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} min-h-screen h-full`}>
            <Button onClick={ToggleTheme} className='absolute right-3 top-1'>
                {theme === 'dark' ? <LuSunMoon className='scale-125' /> : <LuSunMedium className='scale-125' />}
            </Button>
            {children}
        </div>
    )
}
