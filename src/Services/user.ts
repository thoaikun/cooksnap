import base from "./base";

const whoAmI = async (accessToken: string) => {
    const res = await base.get("/api/v1/users/profile", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    
    });
    return res.data;
}

const userApi = {
    whoAmI 
}

export default userApi