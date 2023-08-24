import express from 'express';
import cors from 'cors';
import Restaurants from "./API/restaurants.routes.js";
import RestaurantsDAO from './DAO/Restaurants.DAO.js';


const app = express()
app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants",Restaurants)
// app.get("/home",async(req,res)=>{
//     const restau = await RestaurantsDAO.getRestaurants();
//     res.json(restau)
// })
app.get("*",(req,res)=>res.status(404).json({error:"not found"}))

export default app