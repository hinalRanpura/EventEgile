import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
const DecoItemCard = ({ item,deleteDecoItems }) => {
  return (
      <div className="CartItemCard">
        <img src={item.image} alt="image" />
        <div>
            {item.type}
            <span>{`Price : ${item.price}`}</span>
            <span>{`Description : ${item.description}`}</span>
            <p onClick={() => deleteDecoItems(item.cat)}>Remove</p>
            
        </div>
      </div>
  );
}

export default DecoItemCard;
