import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');
    const [user, setUser] = useState(userInfo ? JSON.parse(userInfo) : null);

    const login = (user) => {
        setUser(user);
        // localStorage.setItem('userInfo', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={ { user, login, logout } }>
            { children }
        </AuthContext.Provider>
    );
}