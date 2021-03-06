import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {setSaveOpen} from "../../redux/view/slice";
import {saveFile} from "../../redux/workspace/slice";
import {useEffect, useState} from "react";

export default function SaveDialog() {

    const initailName = useSelector<RootState, string>(state => state.workspace.handle_file.name)
    const [name, setName] = useState<string>("")

    useEffect(() => {
        setName(initailName);
    }, [initailName])

    const open = useSelector<RootState, boolean>((state) => state.view.save_open)
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        dispatch(setSaveOpen(false))
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={"form-dialog-save"} fullWidth={true}>
            <DialogTitle id={"form-dialog-save"}>ワークスペースを保存</DialogTitle>
            <DialogContent>
                <TextField
                    error={name === ""}
                    defaultValue={initailName}
                    autoFocus
                    margin="dense"
                    id="name"
                    label={name === "" ? "Error" : "Name"}
                    type="text"
                    fullWidth
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        if (name === "") {
                            return
                        }
                        handleClose()
                        dispatch(saveFile(name))
                    }}
                    color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}