import {
    Button,
    createStyles,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {Delete, Edit, InsertDriveFile, MoodBad, Save} from "@material-ui/icons";
import SaveDialog from "./dialog/SaveDialog";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {setDeleteOpen, setSaveOpen, setSwitchOpen, setTabValue} from "../redux/view/slice";
import DeleteDialog from "./dialog/DeleteDialog";
import {FileWorkspace, selectFile} from "../redux/workspace/slice";
import {useState} from "react";
import SwitchDialog from "./dialog/SwitchDialog";
import {Link} from "react-router-dom";

interface Props {
    hidden: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            maxWidth: '720px',
            margin: "auto",
        },
        list: {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
        },
        root: {
            background: theme.palette.background.default,
            "& .MuiList-padding": {
                paddingTop: 0,
                paddingBottom: 0
            },
        },
        listitem: {
            "&:hover": {
                background: theme.palette.action.hover
            }
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        button: {
            margin: theme.spacing(1)
        },
        buttons: {
            color: theme.palette.success.main
        },
        help: {
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.secondary,
            justifyContent: "center",
            marginTop: theme.spacing(4)
        },
        moodbadIcon: {
            marginRight: theme.spacing(3),
        },
    }),
);

export default function FolderList(props: Props) {
    const classes = useStyles()

    const opening_file = useSelector<RootState, string|undefined>(state => state.workspace.opening_file)
    const [searchWord, setSearchWord] = useState("")
    const files = [...useSelector<RootState, FileWorkspace[]>(state => state.workspace.files.filter(f => f.name.includes(searchWord)))]

    files.sort((f1, f2) => {
        if (f1.date < f2.date) {
            return 1
        } else if (f1.date > f2.date) {
            return -1
        } else {
            return 0
        }
    })
    const dispatch = useDispatch<AppDispatch>()

    const list_items: any[] = []

    files.forEach(value => {
        list_items.push(
            <ListItem className={classes.listitem} key={value.id}>
                <ListItemIcon>
                    <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={value.name} secondary={value.date} />
                <ListItemText secondary={value.id === opening_file ? "(current)" : ""} />
                <IconButton
                    aria-label="edit"
                    onClick={() => {
                        dispatch(selectFile(value.id))
                        dispatch(setSwitchOpen(true))
                    }}>
                    <Edit />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        dispatch(selectFile(value.id))
                        dispatch(setDeleteOpen(true))
                    }}>
                    <Delete />
                </IconButton>
            </ListItem>
        )
        list_items.push(<Divider key={value.id + "_divider"}/>)
    })

    return (
        <div className={classes.root} hidden={props.hidden}>
            <div className={classes.content}>
                <div className={classes.toolbar}>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-search" label="Search" type="search" onChange={(event) => setSearchWord(event.target.value)} />
                    </form>
                    <div className={classes.buttons}>
                        <Button variant="outlined" color="inherit" className={classes.button} onClick={() => dispatch(setTabValue(0))} component={Link} to={"/"}>Create</Button>
                        <Button variant="outlined" endIcon={<Save/>} color="primary" className={classes.button} onClick={() => dispatch(setSaveOpen(true))}>Save</Button>
                    </div>
                </div>
                <List className={classes.list} hidden={files.length === 0}>
                    {list_items}
                </List>
                <div hidden={files.length !== 0}>
                    <div className={classes.help}>
                        <MoodBad className={classes.moodbadIcon} />
                        <Typography variant="h5">
                            No Files
                        </Typography>
                    </div>
                </div>
            </div>
            <SaveDialog />
            <DeleteDialog />
            <SwitchDialog />
        </div>
    );
}