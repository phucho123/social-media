import axios from "axios";

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "socialmedia");

    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dzgxwz6xj/image/upload/`,
            formData);
        return res.data?.secure_url;
    } catch (err) {
        console.log(err);
    }
}

export const deleteImage = async (data) => {
    // const formData = new FormData();
    // formData.append("upload_preset", "socialmedia");
    // formData.append("public_id", data.public_id);
    // formData.append("signature", data.signature);
    const timestamp = Math.floor(Date.now() / 1000);
    const api_key = "142999761741237";

    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dzgxwz6xj/image/destroy?public_id=${data.public_idd}&signature=${data.signature}&api_key=${api_key}&timestamp=${timestamp}`,
        );
        // return res.data;
    } catch (err) {
        console.log(err);
        console.log("errrrr")
    }
}