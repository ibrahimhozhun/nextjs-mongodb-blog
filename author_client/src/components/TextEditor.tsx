import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Button, TextField, Typography } from '@material-ui/core';
import useStyles from "../styles";

const TextEditor: React.FC<{
  onSubmit: (body: string, title: string) => Promise<any>,
  body?: string,
  title?: string,
  redirectHome?: boolean,
  action: "create" | "update"
}> = ({ onSubmit, body, title: postTitle, redirectHome, action }) => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();

  const savePostContent = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(content, title);
      if (redirectHome) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <Typography className={classes.loading} variant="h3">Loading</Typography>
      ) : (
        <form onSubmit={savePostContent}>
          <TextField
            type="text"
            name="title"
            aria-label="Title"
            label="Title"
            value={postTitle && postTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            color="primary"
            variant="outlined"
            margin="normal"
            disabled={postTitle ? true : false}
            fullWidth
            required
          />
          <Editor
            id="uuid"
            apiKey={process.env.REACT_APP_RICH_TEXT_EDITOR_API_KEY}
            initialValue={body && body}
            init={{
              height: "70vh",
              plugins: [
                "print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern noneditable help charmap quickbars emoticons"
              ],
              toolbar:
                'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor removeformat | pagebreak | fullscreen  preview save print | insertfile image media pageembed link anchor'
            }}
            onEditorChange={(content: string) => setContent(content)}
          />
          <div className={classes.alignLeft}>
            <Button
              aria-label="Cancel"
              variant="contained"
              color="secondary"
              onClick={() => history.push("/")}
            >Cancel</Button>
            <Button
              aria-label="Save"
              variant="contained"
              color="primary"
              type="submit"
            >
              {action}
            </Button>
          </div>
        </form>
      )}
    </>
  )
}

TextEditor.defaultProps = {
  redirectHome: true,
}

export default TextEditor;
