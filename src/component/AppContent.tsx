import BlocklyWorkspace from "./BlocklyWorkspace";
import Code from "./Code";
import File from "./File";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: "calc(100vw - 120px)",
            height: "100vh",
            marginLeft: "120px",
            background: theme.palette.background.default
        }
    }),
);

export default function AppContent() {

    const classes = useStyles()

    const value = useSelector<RootState>((state) => state.view.tab_value)

    return (
        <div className={classes.root}>
            <BlocklyWorkspace hidden={value !== 0}/>
            <Code hidden={value !== 1}/>
            <File hidden={value !== 2}/>
        </div>
    )
}