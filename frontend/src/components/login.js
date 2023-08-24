import { useState,useContext } from "react"
import App from "../App"
import { UserContext } from "../User";

export default function Login(){
         const {user,setUser,logOut}= useContext(UserContext)
        const [self,setSelf] = useState("");
        const [pass,setPass] = useState("")
    const handleSubmit = (e)=>{
            e.preventDefault()
            setUser(self);
            setSelf("")
            setPass("")
    }

    return (
        <div>
            <App logOut={logOut}user={user}/>
           <form className="flex flex-col items-start" onSubmit={e=>handleSubmit(e)}>
            <input className="m-2 border-2 border-gray-400 p-2" type="text" placeholder="enter name" required value={self} onChange={e=>setSelf(e.target.value)} />
            <input className="m-2 border-2 border-gray-400 p-2" type="text" placeholder="enter password"/>
            <button className="bg-gray-200 p-2 ml-16" onClick={e=>handleSubmit(e)}>Submit</button>
           </form>
        </div>
    )
}