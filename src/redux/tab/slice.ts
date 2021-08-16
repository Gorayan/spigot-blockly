import {createSlice} from '@reduxjs/toolkit'

export const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        value: 0,
    },
    reducers: {
        setTabValue: (state, action) => {
            state.value = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTabValue } = tabSlice.actions

export default tabSlice.reducer