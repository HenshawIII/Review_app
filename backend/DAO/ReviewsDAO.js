import mongodb from "mongodb";
// import bson from "bson"
let ObjectId =mongodb.ObjectId


let Reviews;

export default class ReviewsDAO{
    static async InjectRevs(conn){
        if(Reviews){
            return
        }
        try {
            Reviews = await conn.db(process.env.REST_REVIEWS_NS).collection("reviews");
            console.log("done")
        } catch (error) {
            console.log(`Unable to establish conn ${error}`)
        }
    }

    static async addReview(restaurantId,user,review,date){
        try {
            if(!restaurantId){
                throw new Error(`Kindly provide restaurant`)
            }
            const reviewDoc = {
                name:user.name,
                user_id:user._id,
                date,
                text:review,
                restaurant_id:new ObjectId(restaurantId)
            }
            return await Reviews.insertOne(reviewDoc)
        } catch (error) {
            console.error(error);
            return {error:error.message}
        }
    }

    static async updateReview(reviewId,userId,text,date){
        try {
            let updateResponse = await Reviews.updateOne(
                {user_id:userId,_id:new ObjectId(reviewId)},
                {$set:{text:text,date:date}}
            )
            return updateResponse
        } catch (error) {
            console.log(error)
            return(error)
        }
    }

    static async deleteReview(reviewId,userId){
        try {
            let deleteResponse = await Reviews.deleteOne({
                _id:new ObjectId(reviewId),
                user_id:userId
            })
            return deleteResponse
        } catch (error) {
            console.error(error);
            return {error}
        }
    }
}