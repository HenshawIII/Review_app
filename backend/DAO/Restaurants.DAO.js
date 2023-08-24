import e from "express";
import { ObjectId } from "mongodb";
let restaurants;

export default class RestaurantsDAO{
    static async injectDB(conn){
        if(restaurants){
            return
        }
        try {
           restaurants= await conn.db(process.env.REST_REVIEWS_NS).collection("restaurants")
        } catch (error) {
            console.log(`Unable to connect in restaurantsDAO ${error}`)
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20
    }={}){
        let query;
        if(filters){
            if("name" in filters){
                query= {$text:{$search:filters["name"]}}
            }
            if("cuisine" in filters){
                query={...query,"cuisine":filters["cuisine"]}
            }
            if("zipcode" in filters){
                query={...query,"address.zipcode":filters["zipcode"]}
            }
        }

        let cursor

        try {
           cursor =  await restaurants.find(query)
        //    console.log("yah")
        } catch (error) {
            console.log(`error,${error}`)
            return {restaurantsList:[],totalNumRestaurants:0}
        }

        let displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage*page)

        try {
            const restaurantsList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query);
            // console.log(restaurantsList)

                return {restaurantsList,totalNumRestaurants}
        } catch (error) {
            console.log(`Unable to convert ${error}`);
            return {restaurantsList:[],totalNumRestaurants:0}
        }
    }

    static async getRestaurantById(id){
        try {
            const pipeline = [
                {
                    $match : {
                        _id : new ObjectId(id)
                    }
                },    
                     {
                        $lookup  :{
                            from : "reviews",
                            let : {
                                id : "$_id"
                            },
                            pipeline :[
                                {
                                    $match :{
                                        $expr :{
                                            $eq:["$restaurant_id","$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort : {
                                        date : -1
                                    },
                                },
                            ],
                            as : "reviews"
                        },
                     },
                     {
                        $addFields : {
                            reviews : "$reviews",
                        },
                     },
            ]
            return await restaurants.aggregate(pipeline).next()
        } catch (error) {
            console.error(`api,${error}`)
        }
    }

    static async getCuisines(){
        let cuisines = []
        try {
            cuisines.push(await restaurants.distinct("cuisine"))
            return cuisines
        }catch(e){
            console.error(`Unable to use cuisines,${e}`)
            return cuisines
        }
    }
}