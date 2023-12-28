import {DishResult, FoodRecommendation, Recipe} from "@/Model/foodRecommendation"
import axios from "axios"
import base from "./base";
import { IFavorite, IFavoriteDish } from "@/Model/favorite";

const getRecipes = async (query: string='', mealType: null | string=null, cuisineType: null | string=null, dishType: null | string=null) => {
    let params = {
        type: 'public',
        beta: true,
        q: query,
        app_id: 'e3500b3e',
        app_key: '6b8d863a0a91781fc086d7491bfbf73e'
    }

    if (cuisineType !== null) params['cuisineType'] = cuisineType;
    
    if (mealType !== null) params['mealType'] = mealType;

    if (dishType !== null) params['dishType'] = dishType;

    console.log(params);

    return axios.get('https://api.edamam.com/api/recipes/v2', {
            params: params
        })
        .then((res) => {
            const result: DishResult = res.data
            const dishes: Recipe[] = []

            for (let hit of result.hits) {
                dishes.push(hit.recipe)
            }

            return dishes
        })
        .catch(function (error) {
            throw error
        });

}

const getRecommendationFromImage = async (payload: FormData) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.logmeal.es/v2/image/segmentation/complete/v1.0?language=eng',
        headers: { 
            'Authorization': 'Bearer fa3b3b62c7eb255a4f1b3d669f2f6e7802bef299',
            'Content-Type': 'multipart/form-data',
        },
        data : payload
    };
    // return axios.request(config)
    //     .then(function (response) {
    //         const prediction: FoodRecommendation = response.data
    //         const predictedFood = []
    //         for (let result of prediction.segmentation_results) {
    //             for (let recognitionResult of result.recognition_results) {
    //                 predictedFood.push(recognitionResult.name)
    //             }
    //         }
            
    //         // get dishes form the fist item in predictedFood
    //         return axios.get('https://api.edamam.com/api/recipes/v2', {
    //             params: {
    //                 type: 'public',
    //                 beta: true,
    //                 q: predictedFood[0],
    //                 app_id: 'e3500b3e',
    //                 app_key: '6b8d863a0a91781fc086d7491bfbf73e'
    //             }
    //         })
    //     })
    //     .then((res) => {
    //         const result: DishResult = res.data
    //         const dishes: Recipe[] = []
    //         for (let hit of result.hits) {
    //             dishes.push(hit.recipe)
    //         }
    //         return dishes
    //     })
    //     .catch(function (error) {
    //         throw error
    //     });
    return axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: 'public',
                beta: true,
                q: 'salad',
                app_id: 'e3500b3e',
                app_key: '6b8d863a0a91781fc086d7491bfbf73e'
            }
        })
        .then((res) => {
            const result: DishResult = res.data
            const dishes: Recipe[] = []
            for (let hit of result.hits) {
                dishes.push(hit.recipe)
            }
            return dishes
        })
        .catch(function (error) {
            throw error
        });
}

const getDishFromId = async (dishId: string) => {
    const res = await axios.get(`https://api.edamam.com/api/recipes/v2/${dishId}`, {
        params: {
            type: 'public',
            beta: true,
            app_id: 'e3500b3e',
            app_key: '6b8d863a0a91781fc086d7491bfbf73e'
        }
    })

    return res.data.recipe as Recipe
}

const getFavoriteList = async () => {
    const res = await base.get("/api/v1/dishes/list-favorite")
    return res.data as IFavorite[]
}

const createFavoriteList = async (title: string) => {
    const res = await base.post(`/api/v1/dishes/list-favorite?name=${title}`)
    return res.data
}

const deleteFavoriteList = async (id: number) => {
    const res = await base.delete(`/api/v1/dishes/list-favorite/${id}`)
    return res.data
}

const getFavoriteDishes = async (favoriteId: number) => {
    const res = await base.get(`/api/v1/dishes/list-dish?listId=${favoriteId}`)
    const favoriteDishes = res.data as IFavoriteDish[]
    let results: Recipe[] = []
    for (let dish of favoriteDishes) {
        const recipe = await getDishFromId(dish.dish_id)
        results.push(recipe)
    }
    return results
}

const addDishToFavorite = async (listId: number, dishId: string, aboutDish: string) => {
    const res = await base.post(`/api/v1/dishes/dish/favorite-list`,{
        listId,
        dishId,
        aboutDish
    })
    return res.data
}

const deleteDishFromFavorite = async (listId: number, dishId: string) => {
    const res = await base.delete(`/api/v1/dishes/dish/favorite-list`, {
        params: {
            dishId,
            listId,
        }
    })
    return res.data
}

const isDishInFavorite = async (dishId: string) => {
    const res = await base.get(`/api/v1/dishes/is-in-your-favorite`, {
        params: {
            dishId
        }
    })
    return res.data
}

const foodApi = {
    getRecipes,
    getRecommendationFromImage,
    getFavoriteList,
    createFavoriteList,
    deleteFavoriteList,
    getFavoriteDishes,
    addDishToFavorite,
    deleteDishFromFavorite,
    isDishInFavorite,
}

export default foodApi