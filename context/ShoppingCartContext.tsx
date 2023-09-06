"use client"
import { useLocalStorage } from "@/app/hooks/useLocalStorage"
import { createContext, ReactNode, useContext, useState } from "react"

type ShoppingCartProviderProps = {
    children: ReactNode

}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContextType = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    setSidebarVisible: Function
    cartItems: CartItem[]
    sidebarVisible: boolean
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)


export default function ShoppingCartContextProvider({ children }: ShoppingCartProviderProps) {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const [sidebarVisible, setSidebarVisible] = useState(false);


    function getItemQuantity(id: number): number {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                setSidebarVisible,
                cartItems,
                sidebarVisible,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}


export function useShoppingCartContext() {
    return useContext(ShoppingCartContext);
}