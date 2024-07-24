export interface SearchFormProps{
    brand: string;
    productCode: string;
    colorCode: string;
}

export interface BrandSelection{
    brandName: string;
    brandValue: string;
}

export const brandButtons: BrandSelection[] = [
    {
        brandName: "Asics Footwear",
        brandValue: "asicsftwr"
    },
    {
        brandName: "Asics Apparel",
        brandValue: "asicsapp"
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