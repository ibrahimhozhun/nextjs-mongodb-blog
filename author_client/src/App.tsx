import { CssBaseline, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import TextEditor from "./components/TextEditor";
import Update from "./components/Update";
import { useAuth } from "./contexts/Auth";
import useStyles from "./styles";

const App: React.FC = () => {
  const { loading, username } = useAuth();
  const classes = useStyles();

  const createPost = async (body: string, title: string) => {
    try {
      // Be sure body and title are not empty
      if (body.length > 0 && title.length > 0) {
        // Create post
        const res = await axios.post("/posts/create", { body, title });
        console.log(res);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Grid
        className={classes.container}
        container
        alignItems="center"
        justify="center"
      >
        <Switch>
          {loading ? (
            <>
              <Typography variant="h3">Loading</Typography>
            </>
          ) : (
            <>
              {username ? (
                <>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/create">
                    <Grid
                      className={classes.container}
                      container
                      direction="column"
                    >
                      <TextEditor onSubmit={createPost} action="create" />
                    </Grid>
                  </Route>
                  <Route path="/update/:id/:slug">
                    <Grid
                      className={classes.container}
                      container
                      direction="column"
                    >
                      <Update />
                    </Grid>
                  </Route>
                </>
              ) : (
                <Redirect to="/login" />
              )}
              <Route path="/login">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Login />
                </Grid>
              </Route>
            </>
          )}
        </Switch>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
