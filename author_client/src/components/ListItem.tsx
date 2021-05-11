import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem as MuiListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import useStyles from "../styles";
import axios from "axios";

const ListItem: React.FC<{
  post: IPost,
  setUpdateList: (state: boolean) => void
}> = ({ post, setUpdateList }) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();

  const deletePost = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/posts/delete/${post._id}`);
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
    setUpdateList(true);
    setConfirmationDialogOpen(false);
    // We don't need to set loading false again 
    // because we can't perform a state update on an unmounted component(not rendered)
    // also 'Home' component immediately set it true 
    // because we asked it to fetch posts again 
    // setLoading(false);
  }

  return (
    <>
      <MuiListItem>
        <ListItemText>{post.title}</ListItemText>
        <ListItemSecondaryAction>
          <Button
            className={classes.button}
            endIcon={<Update />}
            variant="contained"
            onClick={() => history.push(`/update/${post._id}/${post.slug}`)}
          >
            Update
              </Button>
          <Button
            className={classes.button}
            endIcon={<Delete />}
            variant="contained"
            onClick={() => setConfirmationDialogOpen(true)}
          >
            Delete
              </Button>
          <Dialog
            open={confirmationDialogOpen}
            onClose={() => setConfirmationDialogOpen(false)}
          >
            <>
              <DialogTitle>{loading ? 'Loading' : `Are you sure to delete '${post.title}'?`}</DialogTitle>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={() => setConfirmationDialogOpen(false)}
                >
                  Cancel
                  </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  onClick={deletePost}
                >
                  Delete
                  </Button>
              </DialogActions>
            </>
          </Dialog>
        </ListItemSecondaryAction>
      </MuiListItem>
    </>
  )
}

export default ListItem;
