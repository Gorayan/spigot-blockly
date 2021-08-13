import {configureStore} from "@reduxjs/toolkit";
import tabReducer from "./slice";

export const store = configureStore({
    reducer: {
        tab: tabReducer,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>