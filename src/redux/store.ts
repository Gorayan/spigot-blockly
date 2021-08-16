import {configureStore} from "@reduxjs/toolkit";
import tabReducer from "./tab/slice";
import workspaceReducer from "./workspace/slice";

export const store = configureStore({
    reducer: {
        tab: tabReducer,
        workspace: workspaceReducer
    },
    middleware: (getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>