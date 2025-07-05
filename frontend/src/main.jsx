import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Define the Context with default values
export const Context = createContext({
  isAuthorized: false,
  user: null,
  setIsAuthorized: () => {},
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // Consider removing StrictMode temporarily if it causes lifecycle issues during development
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
