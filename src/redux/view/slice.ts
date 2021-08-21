import {createSlice} from '@reduxjs/toolkit'

export interface viewState {
    save_open: boolean,
    delete_open: boolean,
    switch_open: boolean,
}

const initialState: viewState = {
    save_open: false,
    delete_open: false,
    switch_open: false,
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
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

export const { setDeleteOpen, setSaveOpen, setSwitchOpen } = viewSlice.actions

export default viewSlice.reducer