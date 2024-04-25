import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, persist} from "zustand/middleware";

export type TCartItem = {
	product: any,
	product_variant: any,
	variant_id: string,
	quantity: number
}

export const clearStateTime = 60 * 60 * 1000

type State = {
	list: TCartItem[],
	orderSuccessList: TCartItem[],
	setupTime: number
}

type Actions = {
	add: (props: TCartItem) => void,
	increaseQuantity: (props: {variant_id: string, quantity: number}) => void,
	updateQuantity: (props: {variant_id: string, quantity: number}) => void,
	deleteCartItem: (props: {variant_id: string}) => void,
	reset: () => void,
	addSuccessList: () => void
}

export const useCartStore = create<State & Actions>()(
	persist(
		immer((set, getState) => ({
			list: [],
			orderSuccessList: [],
			setupTime: 0,
			add: (props) => {
				const curState = getState()
				const foundItemIndex = curState.list.findIndex(item => item.variant_id === props.variant_id)
				if(foundItemIndex >= 0){
					curState.increaseQuantity({
						...props
					})
				} else {
					set((state) => {
						state.list.push(props)

						// time for reset the state
						const now = new Date().getTime()
						state.setupTime === 0 ? state.setupTime = now : ''
					})
				}
			},
			increaseQuantity: (props) => {
				const curState = getState()
				const foundItemIndex = curState.list.findIndex(item => item.variant_id === props.variant_id)

				set((state) => {
					state.list[foundItemIndex].quantity += props.quantity
				})
			},
			updateQuantity: (props) => {
				const curState = getState()
				const foundItemIndex = curState.list.findIndex(item => item.variant_id === props.variant_id)

				set((state) => {
					state.list[foundItemIndex].quantity = props.quantity
				})
			},
			deleteCartItem: (props) => {
				const curState = getState()
				const foundItemIndex = curState.list.findIndex(item => item.variant_id === props.variant_id)

				set((state) => {
					state.list.splice(foundItemIndex, 1)
				})
			},
			reset: () => {
				set((state) => {
					state.list = []
					state.setupTime = 0
				})
			},
			addSuccessList: () => {
				set((state) => void(state.orderSuccessList = [...state.list]))
			}
		})),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				list: state.list,
				setupTime: state.setupTime
			})
		}
	)
)
