import React,{useState,useEffect,useContext} from "react"
// import App from "../App"
import Cuisine from "./Cuisines";
import { Link } from "react-router-dom";
import { UserContext } from "../User";
import Loader from "./Loader";

export default function RestaurantsList(){
    // const [name,setName] = useState("");
    const {user,logOut} = useContext(UserContext)
    const [restaurants,setRestaurants]= useState([]);
    const [page,setPage] = useState(1);
    const [name,setName] = useState("")
    const [cuisine,setCuisine] = useState("")
    const [zipcode,setZipcode] = useState("")

    useEffect(()=>{
        fetch(`https://review-app-backend-me.onrender.com/api/v1/restaurants/?page=${page}&name=${name}&cuisine=${cuisine}&zipcode=${zipcode}`)
        .then(data=>data.json())
        .then(data=>setRestaurants(data.restaurantsList))
        
    },[])

    const handleNext = ()=>{
        setPage(pg=>pg+1)
        fetch(`https://review-app-backend-me.onrender.com/api/v1/restaurants/?page=${page}&name=${name}&cuisine=${cuisine}&zipcode=${zipcode}`)
        .then(data=>data.json())
        .then(data=>setRestaurants(data.restaurantsList))
    }
    const handlePrev = ()=>{
        if(page===1){
            return
        }
        setPage(pg=>pg-1);
        fetch(`https://review-app-backend-me.onrender.com/api/v1/restaurants/?page=${page}&name=${name}&cuisine=${cuisine}&zipcode=${zipcode}`)
        .then(data=>data.json())
        .then(data=>setRestaurants(data.restaurantsList))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`https://review-app-backend-me.onrender.com/api/v1/restaurants/?page=${page}&name=${name}&cuisine=${cuisine}&zipcode=${zipcode}`)
        .then(data=>data.json())
        .then(data=>setRestaurants(data.restaurantsList))
    }

    return (
        <div  >
            {/* <App user={user} logOut={logOut}/> */}
            <form className="flex flex-col md:flex-row items-center w-fit" onSubmit={e=>handleSubmit(e)}>
                <input className="border-2 border-gray-400 focus:border-red-500 m-3 p-2" name="name" value={name} placeholder="EnterName" onChange={(e)=>setName(e.target.value)}/>
                <input className="border-2 border-gray-400 focus:border-red-500 m-3 p-2" name="cuisine" value={cuisine} placeholder="EnterCuisine" onChange={(e)=>setCuisine(e.target.value)}/>
                <input className="border-2 border-gray-400 focus:border-red-500 m-3 p-2" name="zipcode" value={zipcode} placeholder="EnterZip" onChange={(e)=>setZipcode(e.target.value)}/>

                    <button className="bg-gray-600 p-2 mx-3 my-1 text-center hover:scale-125 transition-all duration-150 ease-in-out text-white" onClick={(e)=>handleSubmit(e)}>Submit</button>
                    <Cuisine restaurants={restaurants} setRestaurants={setRestaurants}/>
            </form>
       {restaurants.length>0?(<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 bg-gray-200 gap-3 mr-10 ml-12 md:ml-40">
                {restaurants.map((res)=>{

            return (
                <div className="col-span-1 shadow-md p-2 bg-white">
                 <div className="font-xl font-bold text-gray-900 py-2">{res.name}</div>
                 <div>
                    <h2><span className="font-bold">Cuisine</span>:{res.cuisine}</h2>
                    <h2><span className="font-bold">Address</span>:{res.address.building + " "+res.address.street+ res.address.zipcode }</h2>
                </div>
                <div className="flex flex-col items-stretch ">
                <Link to={`/${res._id}/restaurant`}><div className="bg-gray-600 p-2 mx-auto  w-full my-1 text-center text-white"> View Restaurant</div></Link>
                        {/* <div className="bg-gray-600 p-2 mx-auto hover:scale-100 w-full my1 text-center text-white"> View Maps</div> */}
                </div>
                
                </div>)
     })}
     
        </div>):<Loader/> }
        <div className="py-14 flex bottom-0 w-full items-center justify-center bg-slate-400 text-2xl text-white">
                        <span onClick={handlePrev}  className="hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer">Prev </span>
                        <span onClick={handleNext} className="ml-20 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out">Next</span>
                            <span className="ml-8">{page}</span> 
                </div>
        </div>
    )
}