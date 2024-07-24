export interface ScrapeRequest{
    productCode: string;
}

export interface ScrapeResponse{
    success: boolean;
    data: string[];
}