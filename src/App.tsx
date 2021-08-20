import React from 'react'
import "./blockly/block/test"
import "./blockly/block/player"
import {createStyles, makeStyles} from "@material-ui/core/styles"
import MainSideBar from "./component/MainSideBar"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "./redux/store"
import {Redirect, useParams} from "react-router-dom";
import {setOpeningFile} from "./redux/workspace/slice";
import AppContent from "./component/AppContent";

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

    const classes = useStyles();

    dispatch(setOpeningFile(id))

    const app = <div className={classes.root}>
                    <MainSideBar/>
                    <AppContent/>
                </div>

    return isValidId && id !== undefined ? <Redirect to={"/"} /> : app
}

export default App;
