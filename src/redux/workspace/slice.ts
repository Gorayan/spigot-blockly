import {createSlice} from '@reduxjs/toolkit'
import {spigotGenerator} from "../../blockly/generator/generator";
import {WorkspaceSvg} from "blockly";

interface state {
    workspace?: WorkspaceSvg,
    code: string
}

const initialState: state = {
    code: ""
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { generate, setWorkspace} = workspaceSlice.actions

export default workspaceSlice.reducer