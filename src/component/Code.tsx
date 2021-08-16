import {IconButton, Tooltip} from "@material-ui/core"
import {createStyles, makeStyles} from "@material-ui/core/styles"
import Highlight from 'react-highlight'
import "highlight.js/styles/a11y-dark.css"
import clsx from 'clsx';
import {FileCopy} from "@material-ui/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

interface Props {
    hidden: boolean
}

const useStyles = makeStyles((theme) =>
    createStyles({
        code: {
            marginLeft: theme.spacing(8),
            width: "720px",
            maxHeight: "100vh",
        },
        root: {
            width: "calc(100vw - 120px)",
            height: "100vh",
            background: theme.palette.background.default
        },
        buttons: {
            display: "flex",
            color: theme.palette.text.secondary,
            marginTop: theme.spacing(2),
            flexDirection: "row-reverse"
        },
        codeContent: {
            borderRadius: "4px"
        }
    }),
);

function Code(props: Props) {

    const classes = useStyles();

    const code = useSelector<RootState, string>((state) => state.workspace.code)

    return (
        <div className={classes.root} hidden={props.hidden}>
            <div className={classes.code}>
                <div className={classes.buttons}>
                    <CopyToClipboard text={code}>
                        <Tooltip title="Copy">
                            <IconButton aria-label="delete">
                                <FileCopy/>
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </div>
                <Highlight className={clsx("java", classes.codeContent)}>
                    {code}
                </Highlight>
            </div>
        </div>
    )
}

export default Code;