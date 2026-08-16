import api from "./api";

export const getHistory = async () => {
    const response = await api.get("/history");
    return response.data;
};

export const deletePrediction = async (predictionId: string) => {
    await api.delete("/delete_prediction", {
        params: {
            prediction_id: predictionId,
        },
    });
};

export const clearHistory = async () => {
    await api.delete("/clear_history");
};

export const getImageUrl = (imageId: string) => {
    return `http://127.0.0.1:8000/image/${imageId}`;
};