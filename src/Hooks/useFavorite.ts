import { InputController } from "@/Components/Input/useInputController";
import { IFavorite } from "@/Model/favorite";
import foodApi from "@/Services/food";
import { profileSelector } from "@/Store/selector";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

const useFavorite = (inputController: InputController, handleCloseModal: () => void ) => {
    const [favorites, setFavorites] = useState<IFavorite[]>([]);
    const [error, setError] = useState<string>('');
    const profile = useSelector(profileSelector)
    const queryClient = useQueryClient()
    const { isLoading } = useQuery({
        queryKey: ['FAVORITE_LIST', profile?.userId],
        queryFn: async () => {
            if (!profile.userId)
                return Promise.resolve([])

            const data = await  foodApi.getFavoriteList()
            setFavorites(data.filter((item) => profile?.userId && item.userId === parseInt(profile?.userId)))
            return data
        }
    })
    const favoriteMutation = useMutation({
        mutationFn: async (payload: { listName: string }) => {
        setError('')
        if (payload.listName === '')
            throw new Error('List name is required')

        return await foodApi.createFavoriteList(payload.listName)
        },
        onSuccess: async (_) => {
            const newFavorite: IFavorite = {
                listName: inputController.value,
                userId: profile.userId ? parseInt(profile?.userId) : 0,
                id: favorites.length + 1
            }
            setFavorites([newFavorite, ...favorites])
            await queryClient.invalidateQueries({
                queryKey: ['FAVORITE_LIST']
            })
            handleCloseModal()
            inputController.clear()
        },
        onError: async (err) => {
            console.log(err)
            setError(err.message)
        }
    })
    const addDishToFavoriteMutation = useMutation({
        mutationFn: async (payload: { listId: number, dishId: string, dishName: string }) => {
            return foodApi.addDishToFavorite(payload.listId, payload.dishId, payload.dishName)
        },
        onSuccess: async (_) => {
            await queryClient.invalidateQueries({
                queryKey: ['FAVORITE_DISHES']
            })
        },
        onError: async (err) => {
            console.log(err)
        }
    })

    return {
        favorites,
        isLoading,
        error,
        favoriteMutation,
        addDishToFavoriteMutation
    }
}

export default useFavorite

