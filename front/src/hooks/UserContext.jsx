import { useContext, createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState('');

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}
const useUser = () => {
    const context = useContext(UserProvider)
    return context;
}

export { UserProvider, useUser }