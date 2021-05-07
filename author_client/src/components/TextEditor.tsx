import { ChangeEvent, FormEvent, useState } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import useStyles from "../styles";
import { useAuth } from '../contexts/Auth';
import axios from 'axios';

const TextEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { logout } = useAuth();
  const classes = useStyles();

  const savePostContent = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Be sure content and title are not empty
      if (content.length > 0 && title.length > 0) {
        // Create post
        const res = await axios.post("/posts/create", { body: content, title });
        console.log(res);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <form onSubmit={savePostContent}>
        <TextField
          type="text"
          name="title"
          aria-label="Title"
          label="Title"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          color="primary"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />
        <Editor
          id="uuid"
          apiKey="z36hsjno54sy2tp4jez16mor20ny5wpt1ge5im8rhm664hpt"
          init={{
            height: "85vh",
            plugins: [
              "print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern noneditable help charmap quickbars emoticons"
            ],
            toolbar:
              'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor removeformat | pagebreak | fullscreen  preview save print | insertfile image media pageembed link anchor'
          }}
          onEditorChange={(content: string) => {
            setContent(content);
            console.log(content);
          }}
        />
        <ButtonGroup
          className={classes.buttonGroup}
          variant="contained"
          color="primary"
        >
          <Button
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
          <Button
            type="submit"
          >
            Save
          </Button>
        </ButtonGroup>
      </form>
    </>
  )
}

export default TextEditor;
