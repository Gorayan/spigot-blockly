import React, {useEffect} from "react";
import "./BlocklyWorkspace.css";
import toolboxJson from "../resource/test.json"
import Blockly from "blockly";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {setWorkspace} from "../redux/workspace/slice";

interface Props {
    hidden: boolean
}

function BlocklyWorkspace(props: Props) {

    const blocklyDivRef: React.RefObject<HTMLDivElement> = React.createRef();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        if (blocklyDivRef.current === null) {
            return;
        }

        if (blocklyDivRef.current.hasChildNodes()) {
            return;
        }

        const workspace = Blockly.inject(blocklyDivRef.current, {
            toolbox: toolboxJson,
        });

        dispatch(setWorkspace(workspace))

    })

    return (
        <div className="workspace" hidden={props.hidden} >
            <div ref={blocklyDivRef} className="blocklyDiv" />
        </div>
    );
}

export default BlocklyWorkspace;