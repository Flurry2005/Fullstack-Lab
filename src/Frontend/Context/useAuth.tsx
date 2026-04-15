import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, User } from "../types/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInStorage = localStorage.getItem("user");
    let User: User | null = null;
    if (userInStorage) {
      User = JSON.parse(userInStorage) as User;
      setUser(User);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context.
 *
 * Provides the current authenticated user along with
 * helper functions to log in and log out.
 *
 * @throws {Error} Will throw an error if used outside of an AuthProvider.
 *
 * @returns {AuthContextType} Authentication context object:
 * @property {User | null} user - The currently authenticated user, or null if not logged in.
 * @property {(userData: User) => void} login - Function to log in a user and persist data to localStorage.
 * @property {() => void} logout - Function to log out the user and clear stored data.
 *
 * @example
 * const { user, login, logout } = useAuth();
 *
 * if (user) {
 *   console.log(user.name);
 * }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
