import { createContext, useState, FC, ReactNode } from 'react'
import useAuth from '../../hooks/useAuth';

interface UserProviderProps {
    children: ReactNode,
}
export const UserContext = createContext<boolean>(false);

export const UserProvider: FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<boolean>(false);
    useAuth(setUser);
    
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
