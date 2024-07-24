import { previewImagesDownload } from "@/utils/ImageParser";
import { get } from "http";
import { toast } from "react-toastify";
import { create } from "zustand";

interface CartState{
    cart: string[];
    storedProducts: string[];
    addToCart: (item: string)=> void;
    storeProduct: (item: string)=> void;
    addSetToCart: (items: string)=> void;
    removeFromCart: (item: string)=> void;
    clearCart: ()=> void;
    clearStoredProducts: ()=> void;
    downloadCart: ()=> Promise<void>;
}

export interface SearchState{
    brand: string;
    loading: boolean;
    productCode: string;
    colorCode: string;
    imageUrls: string[];
    setBrand: (brand: string)=> void;
    setProductCode: (productCode: string)=> void;
    setColorCode: (colorCode: string)=> void;
    setImageUrls: (imageUrls: string[])=> void;
    setLoading: ()=> void;
}

export interface RunDNASearchType{
    productCode: string;
    imageUrls: string[];
    success?: boolean;
}

export interface RunDNASearchState{
    currentProductCode: string;
    loading: boolean;
    products: RunDNASearchType[];
    addSingleProduct: (prod: RunDNASearchType)=>void;
    deleteProduct: (productCode: string)=>void;
    addProducts: (prod: RunDNASearchType[])=>void;
    clearProducts: ()=>void;
    updateCurrentProductCode: (productCode: string)=>void;
    setLoading: ()=>void;
}

export const useRunDNASearchStore = create<RunDNASearchState>((set)=>({
    currentProductCode: "",
    loading: false,
    setLoading: ()=> set((state)=>({loading: !state.loading})),
    products: [],
    addSingleProduct: (prod: RunDNASearchType)=> set((state)=> ({products: [...state.products, prod]})),
    addProducts: (prod: RunDNASearchType[])=> set((state)=> ({products: [...state.products, ...prod]})),
    clearProducts: ()=> set({products: []}),
    deleteProduct: (productCode: string)=> set((state)=> ({products: state.products.filter(prod=> prod.productCode !== productCode)})),
    updateCurrentProductCode: (productCode: string)=> set({currentProductCode: productCode}),
}))

export const useCartStore = create<CartState>((set, get)=>({
    cart: [],
    storedProducts: [],
    addToCart: (item: string)=> set((state)=> ({cart: [...state.cart, item]})),
    addSetToCart: (item: string)=> set((state)=>({cart: [...state.cart, item]})),
    storeProduct: (item: string)=> set((state)=> ({storedProducts: [...state.storedProducts, item]})),
    removeFromCart: (item: string)=> set((state)=> ({cart: state.cart.filter(cartItem=> cartItem !== item)})),
    clearCart: ()=> set({cart: []}),
    clearStoredProducts: ()=> set({storedProducts: []}),
    downloadCart: async ()=>{
        const state = get();
        await cartZipDownload(state.cart);
    },
}))

export const useSearchStore = create<SearchState>((set)=>({
    loading: false,
    brand: "",
    productCode: "",
    colorCode: "",
    imageUrls: [],
    setBrand: (brand: string)=> set({brand}),
    setProductCode: (productCode: string)=> set({productCode}),
    setColorCode: (colorCode: string)=> set({colorCode}),
    setImageUrls: (imageUrls: string[])=>set({imageUrls}),
    setLoading: ()=> set((state)=>({loading: !state.loading})),
}))


const cartZipDownload = async (cart: string[]) : Promise<void>=>{
    
    try{
        await previewImagesDownload(cart);
        useCartStore.getState().clearCart();    
    } catch(error){
        toast.error("Error downloading images!", {autoClose: 2500});
        return;
    }
    toast.success("Downloading images...", {autoClose: 2500});
}

export const checkExisting = async (productCode : string) : Promise<boolean> =>{

    const state = useRunDNASearchStore.getState();
    return state.products.some((product)=> product.productCode === productCode);
}