import React, {useEffect} from "react";
import "./BlocklyWorkspace.css";
import toolboxJson from "../resource/test.json"
import Blockly from "blockly";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {FileWorkspace, setWorkspace} from "../redux/workspace/slice";

interface Props {
    hidden: boolean
}

function BlocklyWorkspace(props: Props) {

    const blocklyDivRef: React.RefObject<HTMLDivElement> = React.createRef();

    const file = useSelector<RootState, FileWorkspace|undefined>(state => state.workspace.files.find(f => f.id === state.workspace.opening_file))

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        if (props.hidden) {
            return;
        }

        if (blocklyDivRef.current === null) {
            return;
        }

        if (blocklyDivRef.current.hasChildNodes()) {
            return;
        }

        const workspace = Blockly.inject(blocklyDivRef.current, {
            toolbox: toolboxJson as Blockly.utils.toolbox.ToolboxDefinition,
        });

        if (file !== undefined) {
            const xml = Blockly.Xml.textToDom(file.workspace)
            workspace.clear()
            Blockly.Xml.domToWorkspace(xml, workspace)
        }

        dispatch(setWorkspace(workspace))

    })

    return (
        <div className="workspace" hidden={props.hidden} >
            <div ref={blocklyDivRef} className="blocklyDiv" />
        </div>
    );
}

export default BlocklyWorkspace;