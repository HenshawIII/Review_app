import React,{useState,createContext} from "react";


const UserContext = createContext()

 function UserProvider(props){
    const [user,setUser] = useState(null);

    const logOut = ()=>{
        setUser(null)
    }
    

    const value={
        user,
        setUser,
        logOut
    }
    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )

}

export {UserContext,UserProvider}