import {DishResult, FoodRecommendation, Recipe} from "@/Model/foodRecommendation"
import axios from "axios"

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
    return axios.request(config)
        .then(function (response) {
            const prediction: FoodRecommendation = response.data
            const predictedFood = []
            for (let result of prediction.segmentation_results) {
                for (let recognitionResult of result.recognition_results) {
                    predictedFood.push(recognitionResult.name)
                }
            }
            
            // get dishes form the fist item in predictedFood
            return axios.get('https://api.edamam.com/api/recipes/v2', {
                params: {
                    type: 'public',
                    beta: true,
                    q: predictedFood[0],
                    app_id: 'e3500b3e',
                    app_key: '6b8d863a0a91781fc086d7491bfbf73e'
                }
            })
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
    // return axios.get('https://api.edamam.com/api/recipes/v2', {
    //         params: {
    //             type: 'public',
    //             beta: true,
    //             q: 'salad',
    //             app_id: 'e3500b3e',
    //             app_key: '6b8d863a0a91781fc086d7491bfbf73e'
    //         }
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
}

const foodApi = {
    getRecommendationFromImage
}

export default foodApi