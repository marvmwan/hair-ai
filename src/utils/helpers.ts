import * as FileSystem from 'expo-file-system';

/**
 * Convert an image file to a base64 string
 * @param uri - The URI of the image file
 * @returns The base64 string of the image
 */
export const getBase64Image = async (uri: string) => {
    try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
        console.error("Could not read image file:", error);
        return null;
    }
};