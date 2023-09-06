"use client"

import { Button } from "primereact/button"
import storeItems from "../data/storeItems.json"
import { Currency } from "../utils/Currency"
import { useShoppingCartContext } from "../context/ShoppingCartContext"

type StoreItemParams = {
    id: number,
    quantity: number
}

export default function CardItems({ id, quantity }: StoreItemParams) {
    const { removeFromCart } = useShoppingCartContext();
    const storeItem = storeItems.find(item => item.id == id)!
    return <>
        <div className="flex flex-row h-[100px] gap-2">
            <img src={storeItem.imgUrl} className="w-[200px] object-cover" />
            <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-1">
                    <p className="font-semibold text-lg" >{storeItem.name}</p>
                    {quantity > 1 && <span className="text-muted flex items-center">x{quantity}</span>}
                </div>

                <p>{Currency(storeItem.price)}</p>
            </div>
            <div className="flex justify-end items-center w-full gap-2">
                <span className="font-semibold text-lg">{Currency(storeItem.price * quantity)}</span>
                <Button severity="danger" icon="pi pi-times" size="small" aria-label="Cancel" outlined rounded onClick={() => removeFromCart(id)} />
            </div>
        </div>
    </>
}