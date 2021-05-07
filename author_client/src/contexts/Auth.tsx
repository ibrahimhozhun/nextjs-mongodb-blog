import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface IErrors {
  login?: string;
  duplicate?: string;
  name?: string;
  password?: string;
}

interface IAuthContext {
  // I just need to store username in this project
  // but you might want to store more fields(ex.email)
  // then I suggest you to create a User interface for this
  username: string;
  loading: boolean;
  errors: IErrors;
  login: (name: string, password: string) => void;
  logout: () => void;
  // To get user when component first renders
  // We need to call this function whenever our user in database changes
  // But we don't need to call this function except when component first renders
  // because our user never changes
  // If we associate our posts with users then
  // we need to getUser function every time we create a new post
  // That's the basically how you should use this function
  getUser: () => void;
}

// Auth Context
const AuthContext = createContext<IAuthContext>(null);

// React hook to use this context
export const useAuth = () => useContext(AuthContext);

// AuthContext Provider
export const AuthContextProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState<string>(null);
  // We set it to true here because our useEffect hook is runs when component first renders.
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<IErrors>(null);

  useEffect(() => {
    getUser();
  }, []);

  const handleErrors = (err: any) => {
    const errors = err.response.data.errors;

    // Assign errors to state
    Object.keys(errors).forEach((key: string) => {
      setErrors(prevErrors => ({ ...prevErrors, [key]: errors[key] }))
    });
  }

  const getUser = async () => {
    try {
      const res = await axios.get<{ user: string }>("/auth/currentUser");
      setUsername(res.data.user);
      setErrors(null);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  const logout = async () => {
    setUsername(null);
    setErrors(null);
    await axios.get("/auth/logout");
  };

  const login = async (name: string, password: string) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await axios.post<{ user: string }>("/auth/login", { name, password });
      setErrors(null);
      setUsername(res.data.user);
    } catch (error) {
      console.log(error.response);
      handleErrors(error);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        login,
        logout,
        getUser,
        loading,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
