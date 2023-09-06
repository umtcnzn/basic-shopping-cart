"use client"

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { Currency } from '../utils/Currency';
import { useShoppingCartContext } from '../context/ShoppingCartContext';

type StoreItemParams = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export default function StoreItem({ id, name, price, imgUrl }: StoreItemParams) {

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCartContext();
    const quantity = getItemQuantity(id);

    const header = (
        <div className='flex justify-center pt-5'>
            <div className='w-[400px]'>
                <img src={imgUrl} className='h-[200px] border-2 border border-slate-300 hover:border-indigo-300 object-cover' />
            </div>
        </div >
    )

    const title = (
        <div className='flex justify-between'>
            <span>{name}</span>
            <span className='font-semibold'>{Currency(price)}</span>
        </div >

    )

    const footer =
        (
            <>
                {quantity == 0 && <div className='flex flex-row justify-center'>
                    <Button label='+ Add To Cart' size='small' onClick={() => increaseCartQuantity(id)} />
                </div>}
                {quantity > 0 && <div className='flex flex-col gap-y-3'>
                    <div className='flex flex-row justify-center gap-4'>
                        <Button icon="pi pi-minus" size="small" severity="secondary" onClick={() => decreaseCartQuantity(id)} />
                        <div className="text-center flex justify-center items-center">
                            <span className='font-bold text-2xl'>{quantity}<sub className='text-sm font-semibold'> in cart</sub></span>
                        </div>
                        <Button icon="pi pi-plus" size="small" severity="success" onClick={() => increaseCartQuantity(id)} />
                    </div>
                    <div className='flex flex-row justify-center gap-2'>
                        <Button size="small" label='Remove' severity='danger' onClick={() => removeFromCart(id)} />
                    </div>
                </div>}
            </>
        )

    return <>
        <Card className='w-[450px] drop-shadow-xl bg-slate-300' header={header} title={title} footer={footer} />
    </>
}