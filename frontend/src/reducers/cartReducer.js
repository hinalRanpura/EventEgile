import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  ADD_TO_DECO,
  REMOVE_DECO_ITEM,
  ADD_TO_CAT,
  REMOVE_CAT_ITEM,
  DATE_TIME_INFO
} from "../consants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], timeInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.venue === item.venue
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.venue === isItemExist.venue ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.venue !== action.payload),
      };


    case DATE_TIME_INFO:
      return {
        ...state,
        timeInfo: action.payload
      }
    default:
      return state;
  }
};

export const decoReducer = (
  state = { decoItems: [] },
  action
) => {
  switch (action.type) {
    case ADD_TO_DECO:
      const item = action.payload;

      const isItemExist = state.decoItems.find(
        (i) => i.venue === item.venue
      );

      if (isItemExist) {
        return {
          ...state,
          decoItems: state.decoItems.map((i) =>
            i.venue === isItemExist.venue ? item : i
          ),
        };
      } else {
        return {
          ...state,
          decoItems: [...state.decoItems, item],
        };
      }

    case REMOVE_DECO_ITEM:
      return {
        ...state,
        decoItems: state.decoItems.filter((i) => i.venue !== action.payload),
      };

    default:
      return state;
  }
};

export const catReducer = (
  state = { catItems: [] },
  action
) => {
  switch (action.type) {
    case ADD_TO_CAT:
      const item = action.payload;

      const isItemExist = state.catItems.find(
        (i) => i.caterer === item.caterer
      );

      if (isItemExist) {
        return {
          ...state,
          catItems: state.catItems.map((i) =>
            i.caterer === isItemExist.caterer ? item : i
          ),
        };
      } else {
        return {
          ...state,
          catItems: [...state.catItems, item],
        };
      }

    case REMOVE_CAT_ITEM:
      return {
        ...state,
        catItems: state.catItems.filter((i) => i.caterer !== action.payload),
      };

    default:
      return state;
  }
};