import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "./contexts/Auth";

const App: React.FC = () => {
  const {
    username,
    login,
    logout,
    loading,
    register,
    errors
  } = useAuth();
  // this states are just testing auth context i will delete them
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
          // this component is just for testing auth context, i will delete them later
          <div>
            errors: {JSON.stringify(errors, null, 4)}
          {username ? (
            <div>
              <div>{username}</div>
              <button onClick={() => logout()}>logout</button>
            </div>
          ) : (
            <>
              <div>
                <form
                  onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    login(uname, password);
                  }}
                >
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    value={uname}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUname(e.target.value)
                    }
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                  />
                  <button type="submit">login</button>
                </form>
              </div>
              <div>
                    <form onSubmit={(e: FormEvent) => {
                      e.preventDefault();
                      register(uname, password);
                }}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUname(e.target.value)
                    }
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    name="password"
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                      />
                      <button type="submit">register</button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
