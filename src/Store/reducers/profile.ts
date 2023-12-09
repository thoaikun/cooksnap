import { IProfile } from '@/Model/profile'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {} as IProfile

const profileStore = createSlice({
    name: 'profileStore',
    initialState: initialState as any,
    reducers: {
        fetchAccessToken: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                accessToken: action.payload,
            }
        },
        fetchProfile: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload,
            }
        }
    },
})

export default profileStore
