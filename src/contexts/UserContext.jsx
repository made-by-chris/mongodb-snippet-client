import { toast } from "react-toastify";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const notify = (msg) => toast(msg);

  const [user, setUser] = useState();
  const history = (path) => window.history.pushState({}, "", path);

  const login = (email, password) => {
    fetch(import.meta.env.VITE_SNIPPET_API + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notify(data.error);
        } else {
          notify("Welcome back, " + data.username + "!");
          setUser(data);
          history.push("/");
        }
      });
  };

  const register = (email, password) => {
    fetch(import.meta.env.VITE_SNIPPET_API + "users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notify(data.error);
        } else {
          notify("Welcome, " + data.username + "!");
          setUser(data);
          history.push("/");
        }
      });
  };

  const logout = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "users/logout")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notify(data.error);
        } else {
          notify("Logged out successfully!");
          setUser({});
          history.push("/");
        }
      });
  };

  const getProfile = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "users/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notify(data.error);
        } else {
          setUser(data);
        }
      });
  };

  return <UserContext.Provider value={{ user, login, register, logout, getProfile }}>{children}</UserContext.Provider>;
};
