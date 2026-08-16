import api from "./api";

export const predictImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await api.post("/predict", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};