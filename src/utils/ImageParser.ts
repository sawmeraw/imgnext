import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import JSZip from "jszip";

export async function previewImagesDownload(images: string[]) : Promise<void>{
  try {
    const zip = new JSZip();
    const imagePromises = images.map(async (image)=>{
      const response = await fetch(image);
      if(!response.ok){
        toast.error("Error downloading image", {
          autoClose: 750,
        });
        return;
      }
      const blob = await response.blob();
      const randomHash = uuid();
      zip.file(`image-${randomHash}.jpeg`, blob);
    })

    await Promise.all(imagePromises);
    zip.generateAsync({type: "blob"}).then(content=>{
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `images-${uuid()}.zip`;
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

export async function singleImageDownload(url: string) : Promise<void>{
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
  
        link.download = `image-${randomHash}`;
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