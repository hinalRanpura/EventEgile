import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addDetailsToDeco } from "../../actions/cartAction"
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const  DecoCard = ({deco}) => {

  const alert = useAlert();

  const dispatch = useDispatch();
 
  
  useEffect(() => {
    
  }, [dispatch,alert])

  const bookingHandler = () => {

    dispatch(addDetailsToDeco(deco._id))
    alert.success("Decoration Plan Added");
  }

  return (
    <form onSubmit={bookingHandler}>
      <div className="reviewCard">
        <img src={deco.images[0].url} alt="user"/>
        <h2>{deco.type}</h2>
        <p>{deco.price}</p>
        <p>{deco.description}</p>
        <button className="decoSelect" type="Submit">Select</button>
      </div>
    </form>
  );
}

export default DecoCard;
