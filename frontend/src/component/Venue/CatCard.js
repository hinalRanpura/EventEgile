import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addDetailsToCat } from "../../actions/cartAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const  CatCard = ({ cat } ) => {

  const alert = useAlert();

  const dispatch = useDispatch();
  
  useEffect(() => {
    
  }, [dispatch,alert])

  const bookingHandler = () => {
    dispatch(addDetailsToCat(cat._id));
    alert.success("Cat Plan Added");
  }

  return (
    <form onSubmit={bookingHandler}>
      <div className="reviewCard">
        <img src={cat.images[0].url} alt="user"/>
        <h2>{cat.type}</h2>
        <p>{cat.price}</p>
        <p>{cat.description}</p>
        <button className="catSelect">Select</button>
      </div>
    </form>
  ); 
}

export default CatCard;
