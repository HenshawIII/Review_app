import  express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const Router = express.Router()

Router.get("/",RestaurantsCtrl.apiGetRestaurants);
Router.get("/id/:id",(RestaurantsCtrl.apiGetRestaurantsById));
Router.get("/cuisines",RestaurantsCtrl.apiGetRestaurantsCuisines)

Router.route("/review")
.post(ReviewsCtrl.apiPostReview)
.put(ReviewsCtrl.apiPutReview)
.delete(ReviewsCtrl.apiDeleteReview)

export default Router