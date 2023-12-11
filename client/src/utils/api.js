import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
    responseType: "json"
});


export const apiRequest = async ({ url, token, data, method }) => {
    try {
        const res = await api(url, {
            method: method || "GET",
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : ""
            }
        })

        return res;
    } catch (err) {
        console.log(err);
        return { status: "failed", message: err };
    }
}