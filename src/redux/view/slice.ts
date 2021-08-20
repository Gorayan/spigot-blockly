import {createSlice} from '@reduxjs/toolkit'

export interface viewState {
    tab_value: number,
    save_open: boolean,
    delete_open: boolean,
    switch_open: boolean,
}

const initialState: viewState = {
    tab_value: 0,
    save_open: false,
    delete_open: false,
    switch_open: false,
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setTabValue: (state, action) => {
            state.tab_value = action.payload;
        },
        setSaveOpen: (state, action) => {
            state.save_open = action.payload;
        },
        setDeleteOpen: (state, action) => {
            state.delete_open = action.payload;
        },
        setSwitchOpen: (state, action) => {
            state.switch_open = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setTabValue, setDeleteOpen, setSaveOpen, setSwitchOpen } = viewSlice.actions

export default viewSlice.reducer