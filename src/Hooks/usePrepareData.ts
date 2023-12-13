import base from "@/Services/base";
import { profileSelector } from "@/Store/selector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePrepareData = () => {
    const profile = useSelector(profileSelector)

    useEffect(() => {
        base.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${profile.accessToken}`
            return config;
        })
    }, [])
}

export default usePrepareData;