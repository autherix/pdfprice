// UserContext.js
import { createContext, useState } from 'react';
import { useEffect } from 'react';
import auth from '../services/authService';

// Create a new context
const UserContext = createContext();

// Custom provider component to hold the state and provide it to the children
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = auth.getCurrentUser();
        setUser(user);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
