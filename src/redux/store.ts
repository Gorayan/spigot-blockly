import {configureStore} from "@reduxjs/toolkit";
import viewReducer, {viewState} from "./view/slice";
import workspaceReducer, {workspaceState} from "./workspace/slice";
import {localStorageMiddleware} from "./middleware";

export const store = configureStore({
    reducer: {
        view: viewReducer,
        workspace: workspaceReducer,
    },
    middleware: (getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false,
        }).prepend(localStorageMiddleware)
    })
})

export type AppDispatch = typeof store.dispatch;

export interface RootState {
    view: viewState,
    workspace: workspaceState
}