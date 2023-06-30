import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRISS,
} from "../Constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddriss: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const Item = action.payload;
      const exitItem = state.cartItems.find((x) => x.product === Item.product);

      if (exitItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exitItem.product ? Item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, Item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRISS:
      return {
        ...state,
        shippingAddriss: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEM:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
