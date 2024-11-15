import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    ADD_TO_DECO,
    ADD_TO_CAT,
    REMOVE_CAT_ITEM,
    REMOVE_DECO_ITEM,
    DATE_TIME_INFO,
} from "../consants/cartConstants";
import axios from "axios";

// Add to Cart
export const addDetailsToCart = (id) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/venues/${id}`);

    dispatch({
        type: ADD_TO_CART,
         payload: {
          venue: data.venue._id,
          user: data.venue.user,
          name: data.venue.name,
          price: data.venue.price,
          image: data.venue.images[0].url,
          address: data.venue.address,  
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Add to Deco
export const addDetailsToDeco = (id) => async (dispatch, getState) => {

  const { data } = await axios.get(`/api/v1/decoration/${id}`);

  dispatch({
      type: ADD_TO_DECO,
       payload: {
        type: data.decoration.type,
        price: data.decoration.price,
        description: data.decoration.description,
        image: data.decoration.images[0].url,
      },
  });

  localStorage.setItem("decoItems", JSON.stringify(getState().deco.decoItems));
};

// Add to Cat
export const addDetailsToCat = (id) => async (dispatch, getState) => {

  const { data } = await axios.get(`/api/v1/caterer/${id}`);
  dispatch({
      type: ADD_TO_CAT,
       payload: {
        type: data.caterer.type,
        price: data.caterer.price,
        description: data.caterer.description,
        image: data.caterer.images[0].url,
      },
  });

  localStorage.setItem("catItems", JSON.stringify(getState().cat.catItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
 
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CAT
export const removeItemsFromCat = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CAT_ITEM,
    payload: id,
  });
 
  localStorage.setItem("catItems", JSON.stringify(getState().cat.catItems));
};

// REMOVE FROM DECO
export const removeItemsFromDeco = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_DECO_ITEM,
    payload: id,
  });
 
  localStorage.setItem("decoItems", JSON.stringify(getState().deco.decoItems));
};


//save Time and Date Info

export const saveDateInfo = (data) => async(dispatch) => {
  dispatch({
    type: DATE_TIME_INFO,
    payload: data,
  });

  localStorage.setItem("timeInfo",JSON.stringify(data));
}