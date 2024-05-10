'use client'
import {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import isValidArray from "@/utils/isValidArray";
import {getProductPrice} from "@/utils/product_utils";
import base from "@/utils/airtable";

export default function ProductsList(props:{
}){
	const [data, setData] = useState<any []>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		base('products').select({
		}).all().then(r => {
			setData([...r])
		}).finally(() => setLoading(false))
	}, []);

	return (
		<div className={'grid grid-cols-4 gap-5'}>
			{loading ? (
				<>
					<p>Đang load dữ liệu, bạn chờ chút nhé </p>
				</>
			) : (
				<>
					{data.map((product: any, index: number) => (
						<Fragment key={index}>
							<Link href={`/products/${product.id}`}>
								<ProductImage product={product}/>
								<p className={'line-clamp-2'}>{product.fields.name}</p>
								<p className={'font-bold'}>{getProductPrice(product.fields).toLocaleString('vi-VN')}đ</p>
							</Link>
						</Fragment>
					))}
				</>
			)}
		</div>
	)
}

const ProductImage = ({product}: {product: any}) => {
	if(!isValidArray(product.fields?.images)) return <>No image found</>
	return (
		<>
			<Image
				className={'aspect-square w-full'}
				src={product.fields.images[0].url} alt={product.fields.name}
				width={product.fields.images[0].width}
				height={product.fields.images[0].width}
			/>
		</>
	)
}
