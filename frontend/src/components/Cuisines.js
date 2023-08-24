import React,{useState,useEffect} from "react";

export default function Cuisine({restaurants,setRestaurants}){
    const [cuisine,setCuisine] = useState(["All cuisines"])
    useEffect(()=>{
        fetch("https://review-app-backend-me.onrender.com/api/v1/restaurants/cuisines")
        .then(dat=>dat.json())
        .then(dat=>setCuisine([cuisine,...dat[0]]))
    },[])

    const handleChange = (e)=>{
        
        if(e.target.value === "All cuisines"){
            console.log(e.target.value)
        fetch("https://review-app-backend-me.onrender.com/api/v1/restaurants")
        .then(dat=>dat.json())
        .then(data=>setRestaurants(data.restaurantsList))
        }else{
            console.log(e.target.value)
         fetch(`https://review-app-backend-me.onrender.com/api/v1/restaurants/?cuisines=${e.target.value}`)
        .then(dat=>dat.json())
        .then(data=>setRestaurants(data.restaurantsList))
        }
    }
    return(
        <div>
            <select className="w-1/2 border-2 border-gray-400"onChange={e=>handleChange(e)}>
                {/* <option>{cuisine}</option> */}
                {cuisine.map(cus=><option>{cus}</option>)}
            </select>
        </div>
    )
}