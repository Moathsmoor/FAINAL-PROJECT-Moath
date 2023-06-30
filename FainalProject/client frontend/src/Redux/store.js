import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productlistReducer,
} from "./Reduers/productReduers";
import { cartReducer } from "./Reduers/CartReduers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reduers/userReduers";
import {
  orderCreateReducer,
  orderDerailsReducer,
  orderPayReducer,
  orderlistmyReducer,
} from "./Reduers/OrderReduers";

const reducer = combineReducers({
  productList: productlistReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDerailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderlistmyReducer,
});

const cartItemsFormlocalstorge = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//LOGIN
const userInfoFormlocalstorge = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//shipping Addriss
const shippingAddressFormlocalstorge = localStorage.getItem("shippingAddriss")
  ? JSON.parse(localStorage.getItem("shippingAddriss"))
  : {};

const createState = {
  cart: {
    cartItems: cartItemsFormlocalstorge,
    shippingAddress: shippingAddressFormlocalstorge,
  },
  userLogin: { userInfo: userInfoFormlocalstorge },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  createState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
