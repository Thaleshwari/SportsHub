import { createSlice } from "@reduxjs/toolkit";

const storedItems = localStorage.getItem("cartItems");

const initialState = {
  cartitems: storedItems ? JSON.parse(storedItems) : [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const newItem = action.payload;
      const existitem = state.cartitems.find((item) => item.id === newItem.id);

      if (existitem) {
        existitem.quantity += newItem.quantity;
      } else {
        state.cartitems.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },

    deleteFromCart: (state, action) => {
      state.cartitems = state.cartitems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cartitems.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
      }
    },

    // ✅ Increase Quantity
    increaseQuantity: (state, action) => {
      const item = state.cartitems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
      }
    },

    // ✅ Decrease Quantity
    decreaseQuantity: (state, action) => {
      const item = state.cartitems.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove if quantity reaches 0 or 1
          state.cartitems = state.cartitems.filter((i) => i.id !== action.payload);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
      }
    },

    clearCart: (state) => {
      state.cartitems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export default CartSlice.reducer;

export const {
  addTocart,
  deleteFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = CartSlice.actions;
