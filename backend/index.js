import { MongoClient } from "mongodb"
import app from "./server.js"
import dotenv from "dotenv";
import RestaurantsDAO  from "./DAO/Restaurants.DAO.js";
import ReviewsDAO from "./DAO/ReviewsDAO.js";


dotenv.config()
const PORT = process.env.PORT || 8000;

MongoClient.connect(process.env.REST_REVIEWS_URI,{
    maxPoolSize:50,
    wtimeoutMS:5000
})
.then(async client => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.InjectRevs(client)
   
})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is running o port ${PORT}`)
    })
})
.catch((e)=>{
    console.log(e)
    process.exit()
})
