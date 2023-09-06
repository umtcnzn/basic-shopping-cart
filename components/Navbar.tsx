"use client"

import { Menubar } from 'primereact/menubar';
import { Button } from "primereact/button";
import { useShoppingCartContext } from '../context/ShoppingCartContext';

export function Navbar() {
    const { cartItems, setSidebarVisible } = useShoppingCartContext();

    const items = [
        {
            label: "Home",
            icon: "pi pi-home",
            url: "/",
        },
        {
            label: "Store",
            icon: "pi pi-shopping-bag",
            url: "/store",
        },
        {
            label: "About",
            icon: "pi pi-info-circle",
            url: "/about",
        }
    ]
    const end = (
        <>
            <div className='relative h-[54px]'>
                <Button rounded icon="pi pi-shopping-cart" onClick={() => setSidebarVisible(true)} />
                <div className='rounded-full w-[22px]
                 h-[22px] text-center flex justify-center 
                 items-center bg-red-600 text-white
                  text-sm font-semibold absolute bottom-0 right-0' >
                    {cartItems.length}</div>
            </div>
        </>
    );

    return <>
        <Menubar model={items} end={cartItems.length > 0 ? end : ""}
            className="h-[70px] fixed top-0 left-0 right-0 z-50" />
    </>
}