import { createContext, useState, FC, ReactNode } from 'react'
import useAuth from '../../hooks/auth/useAuth';

interface Props {
    children: ReactNode,
}
export const UserContext = createContext<boolean>(false);

export const UserProvider: FC<Props> = ({children}) => {
    const [user, setUser] = useState<boolean>(false);
    useAuth(setUser);
    
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
