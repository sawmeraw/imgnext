import { previewImagesDownload } from "@/utils/ImageParser";
import { toast } from "react-toastify";
import { create } from "zustand";

interface ConfigState {
    hokaVersion: string,
    setHokaVersion: (version: string) => void,
}

interface CartState {
    cart: string[];
    storedProducts: string[];
    addToCart: (item: string) => void;
    storeProduct: (item: string) => void;
    addSetToCart: (items: string) => void;
    removeFromCart: (item: string) => void;
    clearCart: () => void;
    clearStoredProducts: () => void;
    downloadCart: () => Promise<void>;
}

export interface SearchState {
    brand: string;
    loading: boolean;
    productCode: string;
    imageUrls: string[];
    setBrand: (brand: string) => void;
    setProductCode: (productCode: string) => void;
    setImageUrls: (imageUrls: string[]) => void;
    setLoading: (value: boolean) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    storedProducts: [],
    addToCart: (item: string) => set((state) => ({ cart: [...state.cart, item] })),
    addSetToCart: (item: string) => set((state) => ({ cart: [...state.cart, item] })),
    storeProduct: (item: string) => set((state) => ({ storedProducts: [...state.storedProducts, item] })),
    removeFromCart: (item: string) => set((state) => ({ cart: state.cart.filter(cartItem => cartItem !== item) })),
    clearCart: () => set({ cart: [] }),
    clearStoredProducts: () => set({ storedProducts: [] }),
    downloadCart: async () => {
        const state = get();
        await cartDownload(state.cart);
    },
}))

export const useSearchStore = create<SearchState>((set) => ({
    loading: false,
    brand: "",
    productCode: "",
    imageUrls: [],
    setBrand: (brand: string) => set({ brand }),
    setProductCode: (productCode: string) => set({ productCode }),
    setImageUrls: (imageUrls: string[]) => set({ imageUrls }),
    setLoading: (value: boolean) => set((state) => ({ loading: value })),
}))

export const useConfigStore = create<ConfigState>((set) => ({
    hokaVersion: "",
    setHokaVersion: (version: string) => set({ hokaVersion: version })
}))


const cartDownload = async (cart: string[]): Promise<void> => {

    try {
        await previewImagesDownload("", cart);
        useCartStore.getState().clearCart();
    } catch (error) {
        toast.error("Error downloading images!", { autoClose: 2500 });
        return;
    }
    toast.success("Downloading images...", { autoClose: 2500 });
}
