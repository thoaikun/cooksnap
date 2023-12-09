import base from "./base";

const whoAmI = async () => {
    const res = await base.get("/api/v1/users/profile");
    return res.data;
}

const userApi = {
    whoAmI 
}

export default userApi