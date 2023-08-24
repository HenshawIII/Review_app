// import RestaurantsDAO from "../DAO/Restaurants.DAO.js";
import ReviewsDAO from "../DAO/ReviewsDAO.js";

export default class ReviewsCtrl{
    static async apiPostReview(req,res,next){
        try {
            let restaurantId = req.body.restaurant_id;
            let review = req.body.text;
            let userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            )
            // console.log(ReviewResponse)
            let {error} = ReviewResponse
            if (error){
                res.status(500).json({error:error.message})
            }else{
                res.json({status:"success"})
            }

        } catch (error) {
            res.status(500).json({error:error.message})
            console.log(error)
        }
    }
    static async apiPutReview(req,res,next){
        try {
            let reviewId = req.body.review_id;
            let text = req.body.text;
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date
            )
            let {error} = ReviewResponse
            if (error){
              return  res.status(400).json({error})

            }
            if(ReviewResponse.modifiedCount === 0){
                throw new Error(`Unable to update - user may not be original poster`)
            }
            res.json({status:"success"})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error:error.message})
        }
    }
    static async apiDeleteReview(req,res,next){
           try {
            let reviewId = req.query.id;
            let userId = req.body.user_id
            console.log(reviewId)
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )
            res.json({status:"success"})
           } catch (error) {
            res.status(400).json({error:error.message})
            console.error(error)
           }
    }
}