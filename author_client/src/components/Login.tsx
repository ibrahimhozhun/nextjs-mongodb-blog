import { Button, Grid, TextField } from "@material-ui/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../contexts/Auth";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(username, password);
    setUsername("");
    setPassword("");
  }

  return (
    <form noValidate className="container card" onSubmit={handleSubmit}>
      <Grid
        direction="column"
        container
        alignItems="center"
        justify="center"
      >
        <Grid
          item
          xs={12} sm={8} md={6}
        >
          <TextField
            aria-label="Username"
            type="text"
            label="Username"
            name="username"
            color="primary"
            margin="dense"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          xs={12} sm={8} md={6}
        >
          <TextField
            aria-label="Password"
            type="password"
            label="Password"
            name="password"
            color="primary"
            margin="dense"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item>
          <Button color="secondary" variant="contained" type="submit">Login</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Login;