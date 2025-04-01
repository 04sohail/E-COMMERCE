import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    carts: [
        {
            id: nanoid(),
            user_id: 101,
            cart_id: 1
        }
    ]
}

const cart_slice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const newCart = {
                id: nanoid(),
                user_id: action.payload.user_id,
                cart_id: action.payload.cart_id
            }
            console.log(action.payload);
            state.carts = [...state.carts, newCart]
        },
        removeCart: (state, action) => {
            state.carts = state.carts.filter((cart) => cart.id !== action.payload)
        }
    }
})


export const { addCart, removeCart } = cart_slice.actions

export default cart_slice.reducer
