/**
 * AuthContext provides authentication and global state management for the application.
 *
 * @typedef {Object} AuthContextValue
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @property {Object} username - The current user's information.
 * @property {string|null} currentAction - The current action being performed (e.g., "login").
 * @property {Object} thisBook - The currently selected book object.
 * @property {boolean} refresh - State to trigger refreshes in components.
 * @property {Object|undefined} param - Application parameters fetched from the backend.
 * @property {function(Object):void} login - Function to log in a user.
 * @property {function():void} logout - Function to log out the user.
 * @property {function(string|null):void} setCurrentAction - Setter for currentAction.
 * @property {function(Object):void} setThisBook - Setter for thisBook.
 * @property {function(Object):void} setUsername - Setter for username.
 * @property {function(boolean):void} setIsAuthenticated - Setter for isAuthenticated.
 * @property {function(boolean):void} setRefresh - Setter for refresh.
 * @property {function(Object):void} setParam - Setter for param.
 */

/**
 * AuthProvider component that wraps its children with AuthContext.Provider,
 * supplying authentication state and related actions.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} The AuthContext provider with authentication state and actions.
 */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState({});
  const [currentAction, setCurrentAction] = useState(null);
  const [thisBook, setThisBook] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [param, setParam] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    setCurrentAction("login");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername({});
    setCurrentAction(null);
  };

  useEffect(() => {
    let url = "http://localhost:8080/api/params";
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        let data = response.data;
        // console.log("data", data);
        let par = [];
        for (let i = 0; i < data.length; i++) {
          par[data[i].param_key] = data[i].value_string;
          if (data[i].value_long) {
            par[data[i].param_key] = data[i].value_long;
          } else if (data[i].value_decimal) {
            par[data[i].param_key] = data[i].value_decimal;
          }
        }
        setParam(par);
        // console.log("data", data, param);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        currentAction,
        thisBook,
        refresh,
        param,
        login,
        logout,
        setCurrentAction,
        setThisBook,
        setUsername,
        setIsAuthenticated,
        setRefresh,
        setParam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
