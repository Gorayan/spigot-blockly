import {Link, Tab, Tabs} from "@material-ui/core";
import {Description, Extension, Folder, GitHub, Twitter} from "@material-ui/icons";
import React, {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

    const [value, setValue] = useState(0)

    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => setValue(value)}
                orientation="vertical"
            >
                <Tab label="Block" icon={<Extension/>} className={classes.tab}/>
                <Tab label="Code" icon={<Description/>} className={classes.tab}/>
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