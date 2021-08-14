import React from 'react';
import BlocklyWorkspace from "./component/BlocklyWorkspace";
import "./blockly/block/Test";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import MainSideBar from "./component/MainSideBar";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";

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
        </div>
    );
}

export default App;
