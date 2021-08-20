import {Link, Tab, Tabs} from "@material-ui/core";
import {Description, Extension, Folder, GitHub, Twitter} from "@material-ui/icons";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setTabValue} from "../redux/view/slice";
import {AppDispatch, RootState} from "../redux/store";
import {generate} from "../redux/workspace/slice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRight: `1px solid ${theme.palette.divider}`,
            height: "100vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 0
        },
        tab: {
            "&:hover": {
                background: theme.palette.action.hover
            },
            minWidth: "120px"
        },
        socialmedia_icon: {
            width: "100%",
            textAlign: "center",
            padding: "20px 0px",
            "&:hover": {
                color: theme.palette.text.primary
            }
        },
        socailmedias: {
            marginBottom: "10px"
        }
    }),
);

interface SocialMediaProps {
    href: string,
    icon: string | React.ReactElement;
}

function SocialMedia(props: SocialMediaProps) {
    
    const classes = useStyles();
    
    return (
        <Link href={props.href} color="textSecondary" target="_blank" rel="noopener">
            <div className={classes.socialmedia_icon}>
                {props.icon}
            </div>
        </Link>
    )
}

function MainSideBar() {

    const classes = useStyles();

    const value = useSelector<RootState>((state) => state.view.tab_value)
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => dispatch(setTabValue(value))}
                orientation="vertical"
            >
                <Tab label="Block" icon={<Extension/>} className={classes.tab}/>
                <Tab label="Code" icon={<Description/>} className={classes.tab} onClick={() => dispatch(generate())}/>
                <Tab label="File" icon={<Folder/>} className={classes.tab}/>
            </Tabs>
            <div className={classes.socailmedias}>
                <SocialMedia href="https://github.com/Gorayan/spigot-blockly" icon={<GitHub fontSize="large"/>}/>
                <SocialMedia href="https://twitter.com/Gorayan_kun" icon={<Twitter fontSize="large"/>}/>
            </div>
        </div>
    );
}

export default MainSideBar;