'use client'

import {useCartStore} from "@/state/cart-store";
import isValidArray from "@/utils/isValidArray";
import Link from "next/link";
import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CartItemInfo} from "@/components/pages/cart/cart-list";

export default function OrderSuccess(){
	const cartStore = useCartStore()

	if(!isValidArray(cartStore.orderSuccessList)) return (
		<div className={'container my-14'}>
			<h1 className={'text-3xl mb-8'}>Bạn đặt hàng chưa thành công</h1>
			<p>Vui lòng kiểm tra lại giỏ hàng</p>
			<p>Hãy tham khảo các <Link className={'text-indigo-600 underline'} href={'/products'}>sản phẩm</Link> của chúng tôi</p>
		</div>
	)

	return (
		<div className={'container my-14'}>
			<h1 className={'text-3xl mb-8'}>Cảm ơn bạn đã mua hàng</h1>

			<div className="grid grid-10 grid-cols-4">
				<div className={'col-span-3'}>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Sản phẩm</TableHead>
								<TableHead className={'w-[350px]'}>Số lượng</TableHead>
								<TableHead className={'text-right'}>Giá</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{cartStore.orderSuccessList.map((item, index) => (
								<TableRow key={item.variant_id}>
									<TableCell className="font-medium">
										<CartItemInfo cartItem={item}/>
									</TableCell>
									<TableCell>
										{item.quantity}
									</TableCell>
									<TableCell className="text-right">
										{(item.product_variant.variant_price * item.quantity).toLocaleString('vi-VN')}đ
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div>
					<div className="flex flex-col gap-3 my-5 w-full items-end sticky top-28">
						<p>Tổng giá trị: {cartStore.orderSuccessList.reduce((acc, item) => acc + item.product_variant.variant_price * item.quantity, 0).toLocaleString('vi-VN')}đ</p>
					</div>
				</div>
			</div>
		</div>
	)
}
