import React from "react";
import "./BlocklyWorkspace.css";
import toolboxJson from "../resource/test.json"
import Blockly, {WorkspaceSvg} from "blockly";

interface Props {
    hidden: boolean
}

class BlocklyWorkspace extends React.Component<Props> {

    private blocklyDivRef: React.RefObject<HTMLDivElement> = React.createRef();
    public workspace: WorkspaceSvg | undefined;


    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {

        if (this.blocklyDivRef.current === null) {
            return;
        }

        if (this.blocklyDivRef.current.hasChildNodes()) {
            return;
        }

        this.workspace = Blockly.inject(this.blocklyDivRef.current, {
            toolbox: toolboxJson,
        });

    }

    render() {

        return (
            <div className="workspace" hidden={this.props.hidden} >
                <div ref={this.blocklyDivRef} className="blocklyDiv" />
            </div>
        );
    }
}

export default BlocklyWorkspace;