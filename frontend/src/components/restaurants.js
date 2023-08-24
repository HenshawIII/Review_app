import { useEffect ,useState,useContext} from "react";
import App from "../App";
import { Link, json, useParams } from "react-router-dom";
import { UserContext } from "../User";

export default function Restaurant({user,setUser,logOut}){
    const userV = useContext(UserContext)
    const {id} = useParams()
    const [res,setRes] =useState(null);
    const [rev,setRev] = useState("")
    useEffect(()=>{
        fetch(`https://review-app-backend-me.onrender.com/api/v1/restaurants/id/${id}`)
        .then(dat=>dat.json())
        .then(dat=>setRes(dat))
    },[])
    const handleSubmitRev = (e)=>{
            e.preventDefault()
            fetch(`https://review-app-backend-me.onrender.com/api/v1/restaurants/review`,{
                method:"POST",
                body:JSON.stringify({restaurant_id:id,text:rev,name:userV.user,user_id:id}),
                headers:{"Content-Type":"application/json"}
            })
            .then(dat=>dat.json())
            .then(dat=>{
                console.log(dat)
                setRev("")
            })
    }
    return (
        <div>
            <App user={userV.user} logOut={userV.logOut}/>
            {res?(<div className="col-span-1 shadow-md p-2 bg-white">
                 <div className="font-xl font-bold text-gray-900 py-2">{res.name}</div>
                 <div>
                    <h2><span className="font-bold">Cuisine</span>:{res.cuisine}</h2>
                    <h2><span className="font-bold">Address</span>:{res.address.building + " "+res.address.street+ res.address.zipcode }</h2>
                </div>
                <div className="flex flex-col justify-start ">
                {/* <div className="bg-gray-600 p-2 mx-auto  w-full my-1 text-center text-white"> View Reviews</div> */}
                        <a target="_blank" rel="no_referrer" href={"https://www.google.com/maps/place/"+res.address.coord[1]+","+res.address.coord[0]}className="bg-gray-600 p-2  hover:scale-100 w-fit my1 text-center text-white rounded-lg"> View Maps</a>
                </div>
                <div>
                    {res.reviews.length>0?res.reviews.map((review)=>{
                        return (
                            <div>
                        <div className="mt-10">
                        <strong>Review:</strong><h1 className="font-light text-gray-800 text-xl inline-block">{review.text}</h1><br/>
                        <strong className="">User:</strong>{review.name}<br/>
                        <strong>Date:</strong>{review.date}<br/>
                        <strong>ID:</strong>{review.user_id}<br/>
                       {userV.user? <div className="flex ">
                                <div className="bg-gray-600 p-2 mr-2 hover:scale-100 w-1/6 my1 text-center text-white rounded-lg">Edit</div>
                                <div className="bg-gray-600 p-2  hover:scale-100 w-1/6 my1 text-center text-white rounded-lg">Delete</div>
                        </div>: <Link to="/login">Kindly Login to add yours</Link>}
                      </div> 
                      {/* {userV.user?<div>
                        <input className="border-2 border-gray-500 m-2 p-2" type="text" value={rev} onChange={e=>setRev(e.target.value)}/>
                        <button onClick={e=>handleSubmitRev(e)}>Submit Review</button>
                            
                        </div>:<Link to="/login">Kindly Login to add yours</Link>} */}
                      </div>
                      )
                    }):userV.user?<div>
                        
                        <div>
                        <input className="border-2 border-gray-500 m-2 p-2" type="text" value={rev} onChange={e=>setRev(e.target.value)}/>
                        <button onClick={e=>handleSubmitRev(e)}>Submit Review</button>
                            
                        </div>
                        
                        </div>:<Link to="/login">Kindly Login to add yours</Link>}
                </div> 
                </div>):<h1>Loading...</h1>}
        </div>
    )
}