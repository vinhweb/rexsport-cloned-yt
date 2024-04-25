import isValidArray from "@/utils/isValidArray";


export const getProductPrice = (productFields: any) => {
	if(!isValidArray(productFields.variant_price))
		return 0

	return productFields.variant_price.sort((a: number,b: number) => a-b)[0]
}

export const getProductVariants = (productFields: any) => {
	const keys = [
		"variants",
		"variant_price",
		"variant_image",
		"variant_name",
		"variant_inhouse",
		"variant_id"
	]

	const rs: any[] = []
	Array(productFields.variants.length).fill(null).forEach((_, index: number) => {
		const obj: any = {}
		keys.forEach((key) => {
			obj[key] = productFields[key] ? productFields[key][index] : null
		})
		rs.push(obj)
	})
	return rs || [null]
}

export const resolveRichText = (text: any) => {
	return String(text).replace('\\', '')
		.replaceAll('\n', '<br/>')
}
