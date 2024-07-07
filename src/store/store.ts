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

interface SearchState{
    brand: string;
    productCode: string;
    colorCode: string;
    imageUrls: string[];
    setBrand: (brand: string)=> void;
    setProductCode: (productCode: string)=> void;
    setColorCode: (colorCode: string)=> void;
    setImageUrls: (imageUrls: string[])=> void;
}

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
    brand: "",
    productCode: "",
    colorCode: "",
    imageUrls: [],
    setBrand: (brand: string)=> set({brand}),
    setProductCode: (productCode: string)=> set({productCode}),
    setColorCode: (colorCode: string)=> set({colorCode}),
    setImageUrls: (imageUrls: string[])=>set({imageUrls}),
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
