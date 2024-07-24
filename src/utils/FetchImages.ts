import { SearchFormProps } from "@/types/SearchTypes";

export default function FetchImages(props: SearchFormProps) : string[]{
    const {brand, productCode, colorCode} = props;

    switch(brand){
        case "asicsftwr":
            return fetchAsics(productCode, colorCode);
        case "asicsapp":
            return fetchAsicsApparel(productCode, colorCode);
        case "saucony":
            return fetchSaucony(productCode, colorCode);
        case "hoka":
            return fetchHoka(productCode, colorCode);
        case "newbalance":
            return fetchNewBalance(productCode);
        case "2xu":
            return fetch2XU(productCode, colorCode);
        default:
            return [];
    }

}

function fetchAsics(productCode: string, colorCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    colorCode = colorCode.trim().toUpperCase();

    const urlArray = [
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SR_RT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SR_LT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_TP_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_BT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_BK_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_SB_FR_GLB?$zoom$`,
    ];

    return urlArray;
}

function fetchAsicsApparel(productCode: string, colorCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    colorCode = colorCode.trim().toUpperCase();

    const urlArray = [
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_GM_FT_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_GM_BK_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_GM_SD_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_GM_Z1_GLB?$zoom$`,
        `https://images.asics.com/is/image/asics/${productCode}_${colorCode}_NM_FT_GLB?$zoom$`,
    ];

    return urlArray;
}

function fetchSaucony(productCode: string, colorCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    colorCode = colorCode.trim().toUpperCase();

    const urlArray = [
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_1?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_2?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_3?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_4?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_5?$dw-hi-res$`,
        `https://s7d4.scene7.com/is/image/WolverineWorldWide/${productCode}-${colorCode}_6?$dw-hi-res$`,
    ];

    return urlArray;
}

function fetchNewBalance(productCode: string): string[]{
    productCode = productCode.trim().toLowerCase();

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

function fetchHoka(productCode: string, colorCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    colorCode = colorCode.trim().toUpperCase();

    const urlArray = [
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/v1718052927/${productCode}-${colorCode}_1.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/v1718052927/${productCode}-${colorCode}_2.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/v1718052927/${productCode}-${colorCode}_5.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/v1718052927/${productCode}-${colorCode}_6.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/v1718052927/${productCode}-${colorCode}_7.png?_s=RAABAB0`,
        `https://dms.deckers.com/hoka/image/upload/q_auto,dpr_auto/b_rgb:ffffff/w_1510/v1718052927/${productCode}-${colorCode}_8.png?_s=RAABAB0`,
    ];

    return urlArray;
}

function fetch2XU(productCode: string, colorCode: string) : string[]{
    productCode = productCode.trim().toUpperCase();
    colorCode = colorCode.trim().toUpperCase();

    const urlArray = [""]

    return urlArray;
}