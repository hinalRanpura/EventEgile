import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; 
import './Cart.css';
const CatItemCard = ({ item,deleteCatItems }) => {
  return (
      <div className="CartItemCard">
        <img src={item.image} alt="image" />
        <div>
            {item.type}
            <span>{`Price : ${item.price}`}</span>
            <span>{`Description : ${item.description}`}</span>
            <p onClick={() => deleteCatItems(item.cat)}>Remove</p>
            
        </div>
      </div>
  );
}

export default CatItemCard;
