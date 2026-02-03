import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  setToken,
  removeToken,
  login as loginService,
  register as registerService,
  getCurrentProfile,
  getUserRolesFromToken,
  logout as logoutService,
} from "../service/authService";

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState(() => getUserRolesFromToken(getToken()));
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setUser(null);
      setRoles([]);
      return;
    }

    let mounted = true;
    setLoading(true);

    getCurrentProfile()
      .then((data) => mounted && setUser(data.user ?? data))
      .catch(() => {
        logoutService();
        setUser(null);
        setRoles([]);
        setTokenState(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [token]);

  const login = async (credentials) => {
    const data = await loginService(credentials);
    const t = data.token ?? data.accessToken;
    if (t) {
      setToken(t);
      setTokenState(t);
      setRoles(getUserRolesFromToken(t));
    }
    setUser(data.user ?? data);
    return data;
  };

  const register = async (payload) => {
    const data = await registerService(payload);
    const t = data.token ?? data.accessToken;
    if (t) {
      setToken(t);
      setTokenState(t);
      setRoles(getUserRolesFromToken(t));
    }
    setUser(data.user ?? data);
    return data;
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setRoles([]);
    setTokenState(null);
  };

  const value = {
    user,
    roles,
    token,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}