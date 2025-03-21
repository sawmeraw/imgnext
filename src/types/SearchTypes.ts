export interface SearchFormProps{
    brand: string;
    productCode: string;
}

export interface BrandSelection{
    brandName: string;
    brandValue: string;
}

export const brandOptions: BrandSelection[] = [
    {
        brandName: "Asics Footwear",
        brandValue: "asicsftwr"
    },
    {
        brandName:"Asics Apparel", 
        brandValue:"asicsapp"
    },
    {
        brandName: "Brooks", 
        brandValue: "brooks"
    },
    {
        brandName: "Hoka",
        brandValue: "hoka"
    },
    {
        brandName: "Saucony",
        brandValue: "saucony"
    },
    {
        brandName: "New Balance",
        brandValue: "newbalance"
    },
    
];