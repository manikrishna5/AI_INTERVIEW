import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  useEffect(() => {
  if (token) {
    localStorage.setItem(
      "token",
      token
    );
  } else {
    localStorage.removeItem(
      "token"
    );
  }
}, [token]);

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);