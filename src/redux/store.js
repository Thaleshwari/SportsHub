import { configureStore } from "@reduxjs/toolkit";
import CartSlice from './cartslice.js';


export const store=configureStore(
    {
        reducer:{
            cart:CartSlice,
            // product: productSlice,

        }
    }
)