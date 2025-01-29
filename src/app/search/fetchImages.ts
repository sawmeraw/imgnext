"use server"
import { SearchFormProps } from "@/types/SearchTypes";
import path from "path";
import fs from "fs";
import { version } from "os";
import { getCurrentVersion } from "../version/route";

export default async function FetchImages(props: SearchFormProps) : Promise<string[]>{
    const {brand, productCode} = props;
    let urls: string[];

    switch(brand.trim()){
        case "asicsftwr":
            urls = fetchAsics(productCode);
            break;
        case "asicsapp":
            urls = fetchAsicsApparel(productCode);
            break;
        case "saucony":
            urls = fetchSaucony(productCode);
            break;
        case "hoka":
            urls = await fetchHoka(productCode);
            break;
        case "newbalance":
            urls = fetchNewBalance(productCode);
            break;
        case "brooks":
            urls = fetchBrooks(productCode);
            break;
        default:
            urls = [];
    }

    const validatedUrls =  await validateUrls(urls) 
    return validatedUrls
}

function isAlpha(char: string): boolean{
    return /^[A-Za-z]$/.test(char);
}

function fetchAsics(productCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    let dotIndex = productCode.indexOf(".")
    const itemCode = productCode.substring(0, dotIndex)
    const colorCode = productCode.substring(dotIndex+1)
    const urlArray = [
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_SR_RT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_SR_LT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_SB_TP_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_SB_BT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_SB_BK_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_SB_FR_GLB?$zoom$`,
    ];

    return urlArray;
}

function fetchAsicsApparel(productCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    let dotIndex = productCode.indexOf(".")
    const itemCode = productCode.substring(0, dotIndex)
    const colorCode = productCode.substring(dotIndex+1)
    const urlArray = [
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_GM_FT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_GM_BK_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_GM_SD_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_GM_Z1_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${itemCode}_${colorCode}_NM_FT_GLB?$zoom$`,
    ];

    return urlArray;
}

function fetchBrooks(productCode: string) : string[]{
    const alphaIndex = 6;
    const itemCode = productCode.substring(0, alphaIndex)
    const colorCode = productCode.substring(alphaIndex+1)
    const urlArray = [
        `https://res.cloudinary.com/dr9fn4qkg/image/upload/w_1367/brooks-images/product-img/${itemCode}_${colorCode}_l_wr.png`,
        `https://res.cloudinary.com/dr9fn4qkg/image/upload/w_1367/brooks-images/product-img/${itemCode}_${colorCode}_a_wr.png`,
        `https://res.cloudinary.com/dr9fn4qkg/image/upload/w_1367/brooks-images/product-img/${itemCode}_${colorCode}_m_wr.png`,
        `https://res.cloudinary.com/dr9fn4qkg/image/upload/w_1367/brooks-images/product-img/${itemCode}_${colorCode}_o_wr.png`,
        `https://res.cloudinary.com/dr9fn4qkg/image/upload/w_1367/brooks-images/product-img/${itemCode}_${colorCode}_h_wr.png`,
        `https://res.cloudinary.com/dr9fn4qkg/image/upload/w_1367/brooks-images/product-img/${itemCode}_${colorCode}_s_wr.png`,
    ]

    return urlArray;

}

function fetchSaucony(productCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    let dashIndex = productCode.indexOf("-")
    const itemCode = productCode.substring(0, dashIndex)
    const colorCode = productCode.substring(dashIndex+1)
    const urlArray = [
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${itemCode}-${colorCode}_1?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${itemCode}-${colorCode}_2?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${itemCode}-${colorCode}_3?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${itemCode}-${colorCode}_4?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${itemCode}-${colorCode}_5?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${itemCode}-${colorCode}_6?$dw-hi-res$`,
    ];

    return urlArray;
}

function fetchNewBalance(productCode: string): string[]{
    productCode = productCode.trim().toLowerCase();
    let dashIndex = productCode.indexOf('-')
    if(dashIndex != -1){
        productCode = productCode.substring(0, dashIndex)
    }
    const urlArray = [
        `https://nb.scene7.com/is/image/NB/${productCode}_nb_02_i?$dw_detail_main_lg$&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`,
        `https://nb.scene7.com/is/image/NB/${productCode}_nb_03_i?$dw_detail_main_lg$&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`,
        `https://nb.scene7.com/is/image/NB/${productCode}_nb_04_i?$dw_detail_main_lg$&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`,
        `https://nb.scene7.com/is/image/NB/${productCode}_nb_05_i?$dw_detail_main_lg$&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`,
        `https://nb.scene7.com/is/image/NB/${productCode}_nb_06_i?$dw_detail_main_lg$&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`,
        `https://nb.scene7.com/is/image/NB/${productCode}_nb_07_i?$dw_detail_main_lg$&bgc=ffffff&layer=1&bgcolor=ffffff&blendMode=mult&scale=10&wid=1600&hei=1600`,
    ];
    return urlArray;
}

async function fetchHoka(productCode: string) : Promise<string[]>{
    productCode = productCode.trim().toUpperCase();
    let dashIndex = productCode.indexOf("-")
    const itemCode = productCode.substring(0, dashIndex)
    const colorCode = productCode.substring(dashIndex+1)

    const config = await getCurrentVersion()
    

    const urlArray = [
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/${config?.version}/${itemCode}-${colorCode}_1.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/${config?.version}/${itemCode}-${colorCode}_2.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/${config?.version}/${itemCode}-${colorCode}_5.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/${config?.version}/${itemCode}-${colorCode}_6.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/${config?.version}/${itemCode}-${colorCode}_7.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/${config?.version}/${itemCode}-${colorCode}_8.png?_s=RAABAB0`,
    ];

    return urlArray;
}

async function validateUrls(urls: string[]): Promise<string[]>{
    let result: string[] = [];
    for(const url of urls){
        try {
            let resp = await fetch(url);
            if (resp.ok) {
              result.push(url);
            }
          } catch (error) {
            console.error(`Error fetching URL ${url}:`, error);
          }
    }
    return result;

}