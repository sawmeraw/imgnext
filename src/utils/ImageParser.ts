import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import JSZip from "jszip";

export async function previewImagesDownload(productCode: string, images: string[]) : Promise<void>{
  try {
    const zip = new JSZip();
    const imagePromises = images.map(async (image, index)=>{
      const response = await fetch(image);
      if(!response.ok){
        toast.error("Error downloading image", {
          autoClose: 750,
        });
        return;
      }
      const blob = await response.blob();
      const randomHash = uuid();
      zip.file(`${productCode? productCode : "imgnext"}-${index}.jpeg`, blob);
    })

    await Promise.all(imagePromises);
    zip.generateAsync({type: "blob"}).then(content=>{
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `imgnext-${productCode}-${uuid().substring(0, 5)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })

    toast.success("Downloading images...", {
      autoClose: 750,
    });
  } catch (error) {
    toast.error("Error downloading image", {
      autoClose: 750,
    })
  }
}

export async function singleImageDownload(productCode: string, url: string) : Promise<void>{
    try {
        const response = await fetch(url);
        if (!response.ok) {
          toast.error("Error downloading image.", {
            autoClose: 750,
          });
          return;
        }
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
  
        const randomHash = uuid();
  
        link.download = `${productCode? productCode : "imgnext"}-${randomHash.substring(0, 4)}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        toast.success("Downloading...", {
          autoClose: 1000,
        });
      } catch (error) {
        console.log("Error downloading image.");
        toast.error("Error downloading image.", {
          autoClose: 1500,
        });
      }
}