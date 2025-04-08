import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type ThemeMode = 'dark' | 'light'

interface IGlobalState {
    theme: ThemeMode
}
const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'light' ? 'light' : 'dark'
}

const initialState: IGlobalState = {
    theme: getInitialTheme()
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark'
            state.theme = newTheme
            localStorage.setItem('theme', newTheme)
        },
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        }
    }
})
export const globalSliceReducer = globalSlice.reducer;
export const { toggleTheme } = globalSlice.actions
export const selectTheme = (state: RootState) => state.global.theme