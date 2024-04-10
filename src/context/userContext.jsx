import axios from 'axios';
import { createContext, useState, useEffect } from "react"

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    // Fetch user profile if not already fetched
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            }).catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }
    }, [user]); // Fetch profile only if user is not already set

    // Load localBalance from localStorage or set it to 0
    const [localBalance, setLocalBalance] = useState(() => {
        const storedBalance = localStorage.getItem('localBalance');
        return storedBalance ? parseFloat(storedBalance) : 0;
    });

    // Update localBalance and store in localStorage
    const updateLocalBalance = (newBalance) => {
        localStorage.setItem('localBalance', newBalance.toString());
        setLocalBalance(newBalance);
    };

    return (
        <UserContext.Provider value={{ user, setUser, localBalance, updateLocalBalance }}>
            {children}
        </UserContext.Provider>
    );
}
