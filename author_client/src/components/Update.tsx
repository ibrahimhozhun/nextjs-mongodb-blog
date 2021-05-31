import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@material-ui/core";
import TextEditor from "./TextEditor"
import useStyles from "../styles";

const Update: React.FC = () => {
  const { id, slug } = useParams<{ slug: string, id: string }>();
  const [post, setPost] = useState<IPost>(null);
  const [fetchPostAgain, setFetchPostAgain] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ post: IPost }>(`/posts/get/${slug}`);
      setPost(res.data.post);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPost();
    return setFetchPostAgain(false);
    // eslint-disable-next-line
  }, [fetchPostAgain]);

  const updatePost = async (content: string) => {
    setLoading(true);
    try {
      const res = await axios.put(`/posts/update/${id}`, { body: content });
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
    setFetchPostAgain(true);
  }

  return (
    <>
      {loading ? (
        <Typography className={classes.loading} variant="h3">Loading</Typography>
      ) : (
        <>
          {post && <TextEditor action="update" onSubmit={updatePost} body={post.body} title={post.title} redirectHome={false} />}
        </>
      )}
    </>
  )
}

export default Update;
