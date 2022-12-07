import { createContext, useState } from "react";

// Create a new UserContext (i.e) user state to store email, loggedIn status, name, userId, JWT token & define actions to set user data.
export const UserContext = createContext({
    userData: {},
    setUser: () => null,
})

// UserProvider creates a user wrapper that can be used to wrap all required components to access userContext & modify user context.
export const UserProvider = ({children}) => {
    const [userData, setUser] = useState({})

    const value = {userData, setUser}

    return <UserContext.Provider value={value}> {children}</UserContext.Provider>
}