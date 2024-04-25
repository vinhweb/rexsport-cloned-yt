import base from "@/utils/airtable";
import {Fragment} from "react";
import ProductsList from "@/components/pages/products/products-list";
import isValidArray from "@/utils/isValidArray";
import {notFound} from "next/navigation";

export default async function ProductPage() {
	const data = await base('products').select({
	}).all()

	if(!isValidArray(data)){
		return notFound()
	}

	return (
		<div className={'container my-14'}>
			<h1 className={'text-2xl font-semibold mb-8'}>Tất cả sản phẩm</h1>
			<ProductsList data={JSON.stringify(data)}/>
		</div>
	);
}
