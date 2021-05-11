import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import useStyles from "../styles";

const Navbar: React.FC = () => {
  const { logout, loading } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      {(loading || location.pathname === "/login") ? (null) : (
        <AppBar position="sticky">
          <Toolbar className={classes.navbar}>
            <Typography
              onClick={() => history.push("/")}
              className={classes.pageTitle}
              variant="h5"
            >
              Anti-Bullying Blog
            </Typography>
            <div>
              <Button
                aria-label="New Post"
                className={classes.button}
                variant="contained"
                onClick={() => history.push("/create")}
              >
                New Post
              </Button>
              <Button
                aria-label="Logout"
                color="secondary"
                variant="contained"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </>
  )
}

export default Navbar;
