
import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IAMGE_PUBLIC_URL_ENDPOINT!,
});

export const deleteImageFromImageKit = async (fileId: string) => {
  try {
    await imagekit.deleteFile(fileId);
    return { success: true };
  } catch (error) {
    console.log("Image delete failed:", error);
    return { success: false };
  }
};
