import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import carritoReducer from "./carrito";
import categoriesReducer from "./categories";
import itemsReducer from "./items";
import productsReducer from "./products";
import singleProductReducer from "./singleProduct";
import usersReducer from "./users";
import picturesReducer from "./pictures";
import reviewReducer from "./review"
import userReducer from "./user";
import carritosProfileReducer from "./carritosProfile"
import emailReducer from "./emails"
import categoryReducer from "./category"
import ordersReducer from "./orders"

export const API = `http://localhost:8000`

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    users: usersReducer,
    carrito: carritoReducer,
    items: itemsReducer,
    singleProduct: singleProductReducer,
    pictures: picturesReducer,
    user: userReducer,
    review: reviewReducer,
    carritosProfile: carritosProfileReducer,
    email: emailReducer,
    orders: ordersReducer
  },
});
export default store;
