import React from 'react'
import BlocklyWorkspace from "./component/BlocklyWorkspace"
import "./blockly/block/test"
import "./blockly/block/player"
import {createStyles, makeStyles} from "@material-ui/core/styles"
import MainSideBar from "./component/MainSideBar"
import {useSelector} from "react-redux"
import {RootState} from "./redux/store"
import Code from "./component/Code"

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex"
        }
    }),
);

function App() {

    const value = useSelector<RootState>((state) => state.tab.value)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MainSideBar/>
            <BlocklyWorkspace hidden={value !== 0}/>
            <Code hidden={value !== 1}/>
        </div>
    );
}

export default App;
