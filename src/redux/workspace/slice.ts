import {createSlice} from '@reduxjs/toolkit'
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
    opening_file?: string
    files: FileWorkspace[]
}

const initialState: workspaceState = {
    selected_file: "",
    code: "",
    files: readLocalStorage()
}

function readLocalStorage() {
    const rawData = localStorage.getItem("files")
    let files: FileWorkspace[] = []
    if (rawData !== null) {
        files = JSON.parse(rawData) as FileWorkspace[]
    }
    return files
}

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        generate: (state) => {
            state.code = spigotGenerator.workspaceToCode(state.workspace);
        },
        setWorkspace: (state, action) => {
            state.workspace = action.payload;
        },
        saveFile: (state, action) => {
            const workspace = state.workspace
            if (workspace === undefined) {
                return
            }
            const dom = workspace.createDom()
            const workspace_text = Blockly.Xml.domToText(dom)
            const id = state.opening_file === undefined ? getUniqueStr() : state.opening_file
            const date = new Date()
            const file: FileWorkspace = {
                id: id,
                name: action.payload,
                date: (date.getFullYear()) + "/" + toDoubleDigits(date.getMonth() + 1) + "/" + toDoubleDigits(date.getDate()) + " " + toDoubleDigits(date.getHours()) + ":" + toDoubleDigits(date.getMinutes()),
                workspace: workspace_text
            }
            state.files = [...state.files.filter((file) => file.id !== id), file]
            state.opening_file = id
        },
        deleteFile: (state, action) => {
            state.files = state.files.filter((file) => file.id !== action.payload)
        },
        selectFile: (state, action) => {
            state.selected_file = action.payload
        },
        setOpeningFile: (state, action) => {
            state.opening_file = action.payload
        },
        setFiles: (state, action) => {
            state.files = action.payload
        }
    },
})

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
};

// Action creators are generated for each case reducer function
export const { generate, setWorkspace, saveFile, deleteFile, selectFile, setOpeningFile, setFiles } = workspaceSlice.actions

export default workspaceSlice.reducer