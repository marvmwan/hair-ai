
import { getBase64Image } from '@/src/utils/helpers';
import apiClient from './apiClient';



export const startHaircutTryOn = async (haircutId: string, sideViewImage: string, faceShapeImage: string) => {
    const sideViewBase64 = await getBase64Image(sideViewImage);
    const faceShapeBase64 = await getBase64Image(faceShapeImage);

    if (!sideViewBase64 || !faceShapeBase64) {
        const errorMessage = "Could not process images for try-on";
        console.error(errorMessage);
        return Promise.reject(new Error(errorMessage));
    }

    const payload = {
        haircutId,
        sideViewImage: sideViewBase64,
        faceShapeImage: faceShapeBase64,
    };

    try {
        const response = await apiClient.post("/haircut-try-on", payload);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}; 