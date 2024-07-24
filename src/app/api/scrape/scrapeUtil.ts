import puppeteer from "puppeteer";

export async function ScrapeSportitude(code: string): Promise<string[] | null> {
  const url = "https://www.sportitude.com.au/";

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    await page.type("#unbxdInput", code);

    await page.click("#searchBtn");

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    await page.waitForSelector('.product-item', { timeout: 10000 });

    const productLinks = await page.$$eval('.product-item', links => {
      return links.map(link => link.getAttribute('href'));
    });

    const imageUrls: string[] = [];

    for (const link of productLinks) {
      if (!link) {
        continue;
      }
      await page.goto(link!);

      await page.waitForSelector('.photo-grid, .photo-grid-more');

      const images = await page.$$eval('.photo-grid img, .photo-grid-more img', imgs => {
        return imgs.map(img => img.getAttribute('src'));
      });


      imageUrls.push(...images.filter(url => url !== null) as string[]);
    }

    await browser.close();

    const largeImages = getLargeImages(imageUrls);
    // console.log("Large images extracted:", largeImages);
    return largeImages;

  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

function getLargeImages(images: string[]) : string[]{
  const largeImages: string[] = [];
  
  for (const image of images){
    if(image.indexOf("__S") != -1){
      const largeImage = image.replace("__S", "__L");
      largeImages.push(largeImage);
    } else{
      const largeImage = image.indexOf(".jpg") != -1 ? image.replace(".jpg", "__L.jpg") : "";
      largeImages.push(largeImage);
    }
  }
  return largeImages;
}
