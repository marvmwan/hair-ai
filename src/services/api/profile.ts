
import { getBase64Image } from '@/src/utils/helpers';
import apiClient from './apiClient';



export const updateProfile = async (data: any) => {
    const { faceShapeImage, sideViewImage, ...restOfData } = data;
    const payload: any = { ...restOfData };

    if (faceShapeImage) {
        payload.faceShapeImage = await getBase64Image(faceShapeImage);
    }
    if (sideViewImage) {
        payload.sideViewImage = await getBase64Image(sideViewImage);
    }

    try {
        const response = await apiClient.post("/profile", payload);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}; 