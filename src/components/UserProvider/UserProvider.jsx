import { createContext, useCallback, useState } from 'react'
import useAuth from '../../hooks/useAuth';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);
    
    useAuth(setUser);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
