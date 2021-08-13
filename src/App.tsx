import React from 'react';
import BlocklyWorkspace from "./component/BlocklyWorkspace";
import "./blockly/block/Test";
import {Box} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MainSideBar from "./component/MainSideBar";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";

const useStyles = makeStyles((theme: Theme) =>
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
        <Box className={classes.root}>
            <MainSideBar/>
            <BlocklyWorkspace hidden={value != 0}/>
        </Box>
    );
}

export default App;
