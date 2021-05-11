import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./contexts/Auth";
import axios from "axios";
import './styles.css';

// Axios configuration
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>, document.getElementById("root"));