import base from "@/utils/airtable";
import isValidArray from "@/utils/isValidArray";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {Fragment} from "react";
import {resolveRichText} from "@/utils/product_utils";
import {marked} from "marked";
import ProductVariantSelection from "@/components/pages/products/product-variant-selection";

export default async function SingleProduct({params}: { params: { productId: string } }) {
	const data = await base('products').select({
		filterByFormula: `RECORD_ID() = '${params.productId}'`
	}).all()

	if (!isValidArray(data)) {
		return notFound()
	}

	const product = data[0]

	return (
		<div className={'container my-6'}>
			<div className="flex gap-6">
				<div className={'flex-shrink-0'}>
					<div className="sticky top-24">
						<ProductImageThumbnails product={product}/>
					</div>
				</div>
				<div className={'flex-grow flex gap-6'}>
					<div className={'w-1/2 flex-shrink-0'}>
						<ProductImages product={product}/>
					</div>
					<div className={'flex-grow'}>
						<h1 className={'my-4 text-4xl'}>{String(product.fields.name)}</h1>
						<ProductVariantSelection product={JSON.stringify(product)}/>

						<div className="my-8">
							<div dangerouslySetInnerHTML={{__html: marked.parse(resolveRichText(product.fields.description))}}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const ProductImageThumbnails = ({product} : {product: any}) => {
	if(!isValidArray(product.fields?.images)) return <>No Image Found</>
	return (
		<div className={'flex flex-col gap-2'}>
			{product.fields.images.map((image: any, index: number) => (
				<Link href={`#${image.id}`} key={image.id}>
					<Image
						src={image.url}
						alt={product.fields.name}
						width={150}
						height={150}
					/>
				</Link>
			))}
		</div>
	)
}

const ProductImages = ({product} : {product: any}) => {
	if(!isValidArray(product.fields?.images)) return <>No Image Found</>
	return (
		<div className={'flex flex-col gap-2'}>
			{product.fields.images.map((image: any, index: number) => (
				<Fragment key={image.id}>
					<Image
						className={'w-full'}
						src={image.url}
						alt={product.fields.name}
						width={image.width}
						height={image.height}
						id={image.id}
					/>
				</Fragment>
			))}
		</div>
	)
}
