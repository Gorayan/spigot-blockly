import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {spigotGenerator} from "../../blockly/generator/generator";
import Blockly, {WorkspaceSvg} from "blockly";

export interface FileWorkspace {
    id: string
    name: string,
    date: string,
    workspace: string
}

export interface workspaceState {
    workspace?: WorkspaceSvg,
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
        reloadHanldeFile: (state) => {
            if (state.workspace === undefined) {
                return
            }
            state.handle_file = {...state.handle_file, workspace: Blockly.Xml.domToText(state.workspace.createDom())}
        },
        generate: (state) => {
            state.code = spigotGenerator.workspaceToCode(state.workspace);
        },
        setWorkspace: (state, action) => {
            state.workspace = action.payload;
        },
        saveFile: (state, action: PayloadAction<string>) => {
            const workspace = state.workspace
            if (workspace === undefined) {
                return
            }
            const dom = workspace.createDom()
            const workspace_text = Blockly.Xml.domToText(dom)
            const id = state.handle_file === undefined ? getUniqueStr() : state.handle_file.id
            const date = new Date()
            const file: FileWorkspace = {
                id: id,
                name: action.payload,
                date: (date.getFullYear()) + "/" + toDoubleDigits(date.getMonth() + 1) + "/" + toDoubleDigits(date.getDate()) + " " + toDoubleDigits(date.getHours()) + ":" + toDoubleDigits(date.getMinutes()),
                workspace: workspace_text
            }
            state.files = [...state.files.filter((file) => file.id !== id), file]
            state.handle_file = file
        },
        deleteFile: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter((file) => file.id !== action.payload)
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

function createFile() {
    const id = getUniqueStr()
    const date = new Date()
    const file: FileWorkspace = {
        id: id,
        name: "",
        date: (date.getFullYear()) + "/" + toDoubleDigits(date.getMonth() + 1) + "/" + toDoubleDigits(date.getDate()) + " " + toDoubleDigits(date.getHours()) + ":" + toDoubleDigits(date.getMinutes()),
        workspace: ""
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

// Action creators are generated for each case reducer function
export const { generate, setWorkspace, saveFile, deleteFile, selectFile, setHandleFile, setFiles } = workspaceSlice.actions

export default workspaceSlice.reducer