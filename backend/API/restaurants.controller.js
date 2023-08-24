import RestaurantsDAO from "../DAO/Restaurants.DAO.js";

export default class RestaurantCtrl{
    static async apiGetRestaurants(req,res,next){
      let  restaurantsPerPage = req.query.restaurantsPerPage? parseInt(req.query.restaurantsPerPage) : 20;
      let page = req.query.page ? parseInt(req.query.page) : 0;

      let filters = {}
      if(req.query.cuisine){
        filters.cuisine = req.query.cuisine
      }
      if(req.query.zipcode){
        filters.zipcode = req.query.zipcode
      }
      if(req.query.name){
        filters.name = req.query.name
      }

      const {restaurantsList,totalNumRestaurants} =await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage
      })

      res.json({restaurantsList,page,entriesPerPage:restaurantsPerPage,filters,totalNumRestaurants})
    }

    static async apiGetRestaurantsById(req,res,next){
        try {
            let id = req.params.id || {};
            let restaurants = await RestaurantsDAO.getRestaurantById(id)
            if(!restaurants){
                return res.status(404).json({error:"Not found"})
            }
            res.json(restaurants)
        } catch (error) {
            console.log(`api,${error}`);
            res.status(500).json({error:error.message})
        }
    }

    static async apiGetRestaurantsCuisines(req,res,next){
        try {
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines)
        } catch (error) {
            console.log(`api,${error}`)
            res.status(500).json({error})
        }
    }
}