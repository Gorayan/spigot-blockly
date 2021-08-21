import React, {useEffect, useState} from "react";
import toolboxJson from "../resource/test.json"
import Blockly, {WorkspaceSvg} from "blockly";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {FileWorkspace, setHandleFile} from "../redux/workspace/slice";
import {createStyles, makeStyles} from "@material-ui/core/styles";

interface Props {
    hidden: boolean
}

const useStyles = makeStyles(() =>
    createStyles({
        blockDiv: {
            width: "100%",
            height: "100%"
        }
    }),
);

function BlocklyWorkspace(props: Props) {

    const classes = useStyles()

    const blocklyDivRef: React.RefObject<HTMLDivElement> = React.createRef();

    const file = useSelector<RootState, FileWorkspace>(state => state.workspace.handle_file)

    const dispatch = useDispatch<AppDispatch>();

    const [workspace, setWorkspace] = useState<WorkspaceSvg>()

    useEffect(() => {

        if (blocklyDivRef.current === null) {
            return
        }

        blocklyDivRef.current.innerHTML = ""

        const newWorkspace = Blockly.inject(blocklyDivRef.current, {
            toolbox: toolboxJson as Blockly.utils.toolbox.ToolboxDefinition
        })

        setWorkspace(newWorkspace)


    }, [file.id])

    useEffect(() => {
        if (workspace === undefined) {
            return
        }
        console.log("file update")
        const dom = Blockly.Xml.workspaceToDom(workspace)
        const workspace_text = Blockly.Xml.domToText(dom)
        dispatch(setHandleFile({...file, workspace: workspace_text}))
        // TODO generator も追加する
    }, [workspace])

    return (
        <div ref={blocklyDivRef} className={classes.blockDiv} hidden={props.hidden} />
    );
}

export default BlocklyWorkspace;