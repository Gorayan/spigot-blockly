import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {setDeleteOpen} from "../../redux/view/slice";
import {deleteFile} from "../../redux/workspace/slice";

export default function DeleteDialog() {

    const selected_file = useSelector<RootState, string>(state => state.workspace.selected_file)
    const open = useSelector<RootState, boolean>((state) => state.view.delete_open)
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        dispatch(setDeleteOpen(false))
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} aria-labelledby={"delete-dialog-title"} aria-describedby={"alert-dialog-description"}>
            <DialogTitle id={"delete-dialog-title"}>本当に削除しますか？</DialogTitle>
            <DialogContent>
                <DialogContentText id={"alert-dialog-description"}>
                    削除すると元に戻せません
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        handleClose()
                        dispatch(deleteFile(selected_file))
                    }}
                    color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}