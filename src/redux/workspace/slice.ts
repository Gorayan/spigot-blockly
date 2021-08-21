import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface FileWorkspace {
    id: string
    name: string,
    date: string,
    workspace?: string
}

export interface workspaceState {
    code: string
    selected_file: string
    handle_file: FileWorkspace
    files: FileWorkspace[]
}

const initialState: workspaceState = {
    selected_file: "",
    code: "",
    handle_file: createFile(),
    files: []
}

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload
        },
        saveFile: (state, action: PayloadAction<string>) => {
            const date = new Date()
            const file = {
                ...state.handle_file,
                date: (date.getFullYear()) + "/" + toDoubleDigits(date.getMonth() + 1) + "/" + toDoubleDigits(date.getDate()) + " " + toDoubleDigits(date.getHours()) + ":" + toDoubleDigits(date.getMinutes()),
                name: action.payload
            }
            state.files = [...state.files.filter((f) => file.id !== f.id), file]
            state.handle_file.name = action.payload
        },
        deleteFile: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter((file) => file.id !== action.payload)
            if (action.payload === state.handle_file.id) {
                state.handle_file = createFile()
            }
        },
        selectFile: (state, action: PayloadAction<string>) => {
            state.selected_file = action.payload
        },
        setHandleFile: (state, action: PayloadAction<FileWorkspace>) => {
            state.handle_file = action.payload
        },
        setFiles: (state, action: PayloadAction<FileWorkspace[]>) => {
            state.files = action.payload
        },
    },
})

export function createFile() {
    const id = getUniqueStr()
    const date = new Date()
    const file: FileWorkspace = {
        id: id,
        name: "",
        date: (date.getFullYear()) + "/" + toDoubleDigits(date.getMonth() + 1) + "/" + toDoubleDigits(date.getDate()) + " " + toDoubleDigits(date.getHours()) + ":" + toDoubleDigits(date.getMinutes()),
    }
    return file
}

function getUniqueStr(myStrong?: number): string {
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
    );
}

function toDoubleDigits(num: any) {
    num += "";
    if (num.length === 1) {
        num = "0" + num;
    }
    return num;
}

export const { setCode, saveFile, deleteFile, selectFile, setHandleFile, setFiles } = workspaceSlice.actions

export default workspaceSlice.reducer