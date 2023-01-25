import { createContext, useContext, useState } from "react";

const UserContext=createContext();
const UserContextDispatcher=createContext();

const UserProvider = ({children}) => {
    const [user,setUser]=useState(null)
;    return ( 
        <UserContext.Provider value={user}>
            <UserContextDispatcher.Provider value={setUser}>
                {children}
            </UserContextDispatcher.Provider>
        </UserContext.Provider>
     );
}
 
export default UserProvider;
export const useUser=()=>useContext(UserContext);
export const useUserActions=()=>useContext(UserContextDispatcher);