import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; 
import './Cart.css';
const CartItemCard = ({ item,deleteCartItems }) => {
  return (
      <div className="CartItemCard">
        <img src={item.image} alt="image" />
        <div>
            <Link to={`/venue/${item.venue}`}>{item.name}</Link>
            <span>{`Price : ${item.price}`}</span>
            <p onClick={() => deleteCartItems(item.venue)}>Remove</p>
            
        </div>
      </div>
  );
}

export default CartItemCard;
