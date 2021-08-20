import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {setSwitchOpen} from "../../redux/view/slice";
import {Link} from "react-router-dom";

export default function SwitchDialog() {

    const selected_file = useSelector<RootState, string>(state => state.workspace.selected_file)
    const open = useSelector<RootState, boolean>((state) => state.view.switch_open)
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        dispatch(setSwitchOpen(false))
    }

    const path = "/" + selected_file

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} aria-labelledby={"delete-dialog-title"} aria-describedby={"delete-dialog-description"}>
            <DialogTitle id={"delete-dialog-title"}>ワークスペースを変更</DialogTitle>
            <DialogContent>
                <DialogContentText id={"delete-dialog-description"}>
                    保存していない場合、変更内容は破棄されます
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button component={Link} to={path} color="primary" onClick={handleClose}>
                    Switch
                </Button>
            </DialogActions>
        </Dialog>
    )
}