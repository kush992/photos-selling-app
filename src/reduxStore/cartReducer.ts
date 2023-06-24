import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemsObj } from 'shared/interface';

interface CartState {
	items: CartItemsObj[];
	isCartOpen: boolean;
}

const initialState: CartState = {
	items: [],
	isCartOpen: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItemsObj>) => {
			state.items.push(action.payload);
		},
		removeItem: (state, action: PayloadAction<CartItemsObj>) => {
			state.items = state.items.filter((item) => item !== action.payload);
		},
		emptyCart: (state) => {
			state.items = [];
		},
		toggleCart: (state, action: PayloadAction<boolean>) => {
			state.isCartOpen = action.payload;
		},
	},
});

export const { addItem, removeItem, emptyCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
