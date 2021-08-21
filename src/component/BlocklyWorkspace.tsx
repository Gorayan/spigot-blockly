import React, {useEffect} from "react";
import toolboxJson from "../resource/test.json"
import Blockly, {WorkspaceSvg} from "blockly";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {FileWorkspace, setHandleFile, setWorkspace} from "../redux/workspace/slice";
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

    let workspace: WorkspaceSvg

    useEffect(() => {

        if (blocklyDivRef.current === null) {
            return
        }

        blocklyDivRef.current.innerHTML = ""

        workspace = Blockly.inject(blocklyDivRef.current, {
            toolbox: toolboxJson as Blockly.utils.toolbox.ToolboxDefinition,
        });

        dispatch(setWorkspace(workspace))

    })

    const clickHandle = () => {
        if (workspace === undefined) {
            return
        }
        const dom = Blockly.Xml.workspaceToDom(workspace)
        dispatch(setHandleFile({...file, workspace: Blockly.Xml.domToText(dom)}))
        // TODO generator も追加する
    }

    return (
        <div ref={blocklyDivRef} className={classes.blockDiv} hidden={props.hidden} onClick={clickHandle} />
    );
}

export default BlocklyWorkspace;