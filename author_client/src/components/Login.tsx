import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import useStyles from "../styles";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, username: user, loading, errors } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(username, password);
    setUsername("");
    setPassword("");
    history.push("/");
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [loading, history, user]);

  return (
    <>
      {user ? (
        <Typography className={classes.centerText} variant="h4">You already logged in.You will be redirected to home page in 3 seconds.</Typography>
      ) : (
        <Grid
          item xs={12} sm={8} md={6} lg={4}
        >
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid className={classes.error}>
              {errors ? Object.keys(errors).map((key) => (
                <div key={key}>{errors[key]}</div>
              )) : null}
            </Grid>
            <Grid
              container
              direction="column"
            >
              <TextField
                aria-label="Username"
                type="text"
                label="Username"
                name="username"
                variant="outlined"
                color="primary"
                margin="normal"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
              />
              <TextField
                aria-label="Password"
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                color="primary"
                margin="normal"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
              <Button color="secondary" variant="contained" type="submit">Login</Button>
            </Grid>
          </form>
        </Grid>
      )}
    </>
  )
}

export default Login;