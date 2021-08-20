import React from 'react'
import BlocklyWorkspace from "./component/BlocklyWorkspace"
import "./blockly/block/test"
import "./blockly/block/player"
import {createStyles, makeStyles} from "@material-ui/core/styles"
import MainSideBar from "./component/MainSideBar"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "./redux/store"
import Code from "./component/Code"
import File from "./component/File"
import {Redirect, useParams} from "react-router-dom";
import {FileWorkspace, setFiles, setOpeningFile} from "./redux/workspace/slice";
import {createStore} from "@reduxjs/toolkit";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex"
        }
    }),
);

function App() {

    const param = useParams() as {id: string}
    let id = param.id === "create" ? undefined : param.id

    const dispatch = useDispatch<AppDispatch>();

    const isValidId = useSelector<RootState, boolean>((state) => state.workspace.files.find(f => f.id === id) !== undefined)
    const value = useSelector<RootState>((state) => state.view.tab_value)

    const classes = useStyles();

    dispatch(setOpeningFile(id))

    const app = <div className={classes.root}>
                    <MainSideBar/>
                    <BlocklyWorkspace hidden={value !== 0}/>
                    <Code hidden={value !== 1}/>
                    <File hidden={value !== 2}/>
                </div>

    return isValidId && id !== undefined ? <Redirect to={"/"} /> : app
}

export default App;
