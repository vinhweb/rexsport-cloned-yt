export default function isValidArray(data: any){
	return data && Array.isArray(data) && data.length > 0
}
