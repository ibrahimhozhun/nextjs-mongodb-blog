import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  List,
  Typography
} from "@material-ui/core";
import useStyles from "../styles";
import ListItem from "./ListItem";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>(null);
  const [updateList, setUpdateList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ posts: IPost[] }>("/posts");
      setPosts(data.posts);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPosts();
    return setUpdateList(false);
  }, [updateList]);

  return (
    <Grid
      className={classes.container}
      container
      direction="column"
    >
      {loading ? (
        <Typography className={classes.loading} variant="h3">Loading</Typography>
      ) : (
        <List>
          {posts && posts.map(post => (
            <ListItem key={post._id} post={post} setUpdateList={setUpdateList} />
          ))}
        </List>
      )}
    </Grid>
  )
}

export default Home;
