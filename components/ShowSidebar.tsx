"use client"

import { useShoppingCartContext } from "../context/ShoppingCartContext"
import { Sidebar } from 'primereact/sidebar';
import CardItems from "./CardItems";
import storeItems from "../data/storeItems.json"
import { Currency } from "../utils/Currency";

export default function ShowSidebar() {
    const { sidebarVisible, setSidebarVisible, cartItems } = useShoppingCartContext();

    function calculateTotalPrice() {
        let total = 0;
        cartItems.forEach(element => {
            total += storeItems.find(item => item.id == element.id)?.price! * element.quantity
        });
        return total;
    }
    return <>

        <Sidebar visible={sidebarVisible} position="right" onHide={() => setSidebarVisible(false)} style={{ width: "600px" }} >

            <div className="flex flex-col gap-5">
                <p className="font-bold text-2xl">Cart</p>
                {cartItems.map((item) => (
                    <CardItems {...item} />
                ))}
                <div className="flex justify-end font-bold text-2xl gap-1">
                    <span>Total:</span>
                    <span>{Currency(calculateTotalPrice())}</span>
                </div>
            </div>
        </Sidebar>
    </>
}