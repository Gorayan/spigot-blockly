import {Middleware} from "@reduxjs/toolkit";
import {RootState} from "./store";

export const localStorageMiddleware: Middleware<
    {}, // Most middleware do not modify the dispatch return value
    RootState
    > = storeApi => next => action => {

    let result = next(action)

    const state = storeApi.getState()

    localStorage.setItem("files", JSON.stringify(state.workspace.files))

    return result
}