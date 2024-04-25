'use client'
export default function Homepage(props:{
	data: any
}){
	console.log(JSON.parse(props.data))
	return (
		<>
			Homepage
		</>
	)
}
