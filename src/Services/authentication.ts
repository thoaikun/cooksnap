import base from "./base";

const authenticate = async (email: string, password: string) => {
    const res = await base.post("/api/v1/auth/authenticate", {
        email,
        password,
    });
    return res.data;
}

const register = async (email: string, password: string) => {
    const res = await base.post("/api/v1/auth/register", {
        email,
        password,
    });
    return res.data;
}

const sendNewPassword = async (email: string) => {
    const res = await base.post("/api/v1/auth/send-new-password", {
        email,
    });
    return res.data;
}

const authenticationApi = {
    authenticate,
    register,
    sendNewPassword,
};

export default authenticationApi