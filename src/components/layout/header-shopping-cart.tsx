'use client'

import {AiOutlineShoppingCart} from "react-icons/ai";
import {clearStateTime, useCartStore} from "@/state/cart-store";
import Link from "next/link";
import {useEffect} from "react";

export default function HeaderShoppingCart(){
	const cartStore = useCartStore()

	useEffect(() => {
		const now = new Date().getTime()

		if(cartStore.setupTime){
			if(now - cartStore.setupTime > clearStateTime){
				cartStore.reset()
			}
		}
	}, [cartStore.setupTime]);

	return (
		<Link href={'/cart'} className={'relative'}>
			<AiOutlineShoppingCart className={'w-8 h-8'}/>
			<div className={'absolute h-full w-full flex items-center top-0 left-0'}>
				<span className="text-xs leading-none -mt-1 ml-4">
					{cartStore.list.length}
				</span>
			</div>
		</Link>
	)
}
