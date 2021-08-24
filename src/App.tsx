import React, {useEffect} from 'react'
import "./blockly/block/test"
import "./blockly/block/player"
import {createStyles, makeStyles} from "@material-ui/core/styles"
import MainSideBar from "./component/MainSideBar"
import {useDispatch} from "react-redux"
import {AppDispatch} from "./redux/store"
import {Redirect, useParams} from "react-router-dom";
import {FileWorkspace, setFiles, setHandleFile} from "./redux/workspace/slice";
import AppContent from "./component/AppContent";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex"
        }
    }),
);

function readLocalStorage() {
    const rawData = localStorage.getItem("files")
    let files: FileWorkspace[] = []
    if (rawData !== null) {
        files = JSON.parse(rawData) as FileWorkspace[]
    }
    return files
}

function App() {

    const param = useParams() as {id: string}
    let id = param.id

    const files = readLocalStorage()
    const handle_file = files.find(f => f.id === id)

    const dispatch = useDispatch<AppDispatch>()

    const isValidId = files.find(f => f.id === id) !== undefined

    useEffect(() => {
        dispatch(setFiles(files))
        if (handle_file !== undefined) {
            dispatch(setHandleFile(handle_file))
        }
    })

    const classes = useStyles();

    const app = <div className={classes.root}>
                    <MainSideBar/>
                    <AppContent/>
                </div>

    return isValidId || id === "create" ? app : <Redirect to={"./"} />
}

export default App;
