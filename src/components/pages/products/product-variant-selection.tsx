'use client'

import {getProductPrice, getProductVariants} from "@/utils/product_utils";
import React, {Fragment, useState} from "react";
import Image from 'next/image'
import {PiCheckCircleFill} from "react-icons/pi";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {useCartStore} from "@/state/cart-store";

export default function ProductVariantSelection(props: {
	product: any
}){
	const {toast} = useToast()
	const cartStore = useCartStore()

	const product = JSON.parse(props.product)
	const variants = getProductVariants(product.fields)

	const [price, setPrice] = useState(Number(getProductPrice(product.fields)))
	const [selectedId, setSelectedId] = useState(variants[0].variants)

	return (
		<>
			<div className={'my-4 py-3 text-xl border-t border-b border-dashed border-gray-900'}>
				Giá: {price.toLocaleString('vi-VN')}đ
			</div>

			<div className="my-4 flex flex-col gap-4">
				<p>Phân loại:</p>
				<div className={'grid grid-cols-3 gap-4'}>
					{variants.map((variant: any, index) => (
						<Fragment key={variant.variants}>
							<div
								className={cn("relative",
									Number(variant.variant_inhouse) > 0 ? 'cursor-pointer' : 'opacity-80 cursor-not-allowed'
								)}
								onClick={() => {
									if(Number(variant.variant_inhouse) > 0){
										setPrice(variant.variant_price)
										setSelectedId(variant.variants)
									}
								}}
							>
								{variant.variant_image?.url ? (
									<Image
										className={'w-full aspect-square bg-gray-200'}
										src={variant.variant_image.url}
										alt={variant.variant_name}
										width={150}
										height={150}
									/>
								): (
									<div
										className={'w-full aspect-square bg-gray-200'}
									/>
								)}
								<div className="absolute w-full bottom-0 left-0 p-1 bg-gray-700 text-white text-xs flex justify-between">
									<div title={variant.variant_name}>
										<p className="line-clamp-1">{variant.variant_name}</p>
										<p className="line-clamp-1">Kho: {variant.variant_inhouse}</p>
									</div>
									<div>
										{Boolean(selectedId === variant.variants) && (
											<PiCheckCircleFill className={'w-6 h-6'}/>
										)}
									</div>
								</div>
							</div>
						</Fragment>
					))}
				</div>
			</div>

			<Button
				size={'lg'}
				className={'w-full text-lg'}
				onClick={() => {
					toast({
						title: "✅ Đã thêm sản phẩm vào giỏ hàng"
					})

					cartStore.add({
						product: {
							name: product.fields.name,
							record_id: product.fields.record_id,
						},
						product_variant: variants.find(v => v.variants === selectedId),
						variant_id: selectedId,
						quantity: 1
					})
				}}
			>
				Thêm vào giỏ
			</Button>
		</>
	)
}
