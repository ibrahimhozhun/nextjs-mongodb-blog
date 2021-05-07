import { Grid, Typography } from "@material-ui/core";
import TextEditor from "./components/TextEditor";
import Login from "./components/Login";
import { useAuth } from "./contexts/Auth";
import useStyles from "./styles";

const App: React.FC = () => {
  const { loading, username } = useAuth();
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      {loading ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <>
          {username ? (
            <Grid
              item xs={12}
              container
              direction="column"
            >
              {/* 
                  // todo: create a navbar and setup router
                */}
              <TextEditor />
            </Grid>
          ) : (
            <Login />
          )}
        </>
      )}
    </Grid>
  );
};

export default App;
