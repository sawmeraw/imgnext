import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { fileToDataUrl, processImage } from "./imageProcessor";

export async function previewImagesDownload(
  productCode: string,
  images: string[]
): Promise<void> {
  const fileArray: File[] = [];
  for (let image of images) {
    try {
      const response = await fetch(image);
      if (!response.ok) {
        toast.error("Error downloading image.", {
          autoClose: 3000,
        });
        return;
      }
      const blob = await response.blob();

      try {
        const file = new File([blob], productCode, { type: "image/png" });
        const processedFile = await processImage(file);
        fileArray.push(processedFile);
      } catch (error) {
        toast.error("Error creating file from the image.", { autoClose: 3000 });
        return;
      }
    } catch (error) {
      toast.error("Error downloading images", { autoClose: 3000 });
      return;
    }
  }

  for (let file of fileArray) {
    const dataUrl = await fileToDataUrl(file);
    const link = document.createElement("a");
    link.href = dataUrl;

    const randomHash = uuid();
    productCode = productCode.replace(".", "");
    link.download = `${
      productCode ? productCode : "imgnext"
    }-${randomHash.substring(0, 4)}`;
    link.click();
  }
}

export async function singleImageDownload(
  productCode: string,
  url: string
): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      toast.error("Error downloading image.", {
        autoClose: 750,
      });
      return;
    }
    const blob = await response.blob();
    const file = new File([blob], productCode, { type: "image/jpeg" });
    const processedFile = await processImage(file);
    const dataUrl = await fileToDataUrl(processedFile);
    const link = document.createElement("a");
    link.href = dataUrl;

    const randomHash = uuid();

    link.download = `${
      productCode ? productCode : "imgnext"
    }-${randomHash.substring(0, 4)}`;
    link.click();
    toast.success("Downloading...", {
      autoClose: 1000,
    });
  } catch (error) {
    toast.error("Error downloading image.", {
      autoClose: 1500,
    });
  }
}
