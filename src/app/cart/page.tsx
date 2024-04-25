import CartList from "@/components/pages/cart/cart-list";

export default function Cart(){
	return (
		<>
			<div className="container my-14">
				<h1 className="text-5xl font-medium mb-8">Giỏ hàng</h1>
				<CartList/>
			</div>
		</>
	)
}
