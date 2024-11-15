import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from "react";
import { Typography } from "@material-ui/core";
import './ConfirmEvent.css';
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData"

const ConfirmEvent = ({history}) => {

    const { timeInfo, cartItems } = useSelector((state) => state.cart);
    const { catItems } = useSelector((state) => state.cat);
    const { decoItems } = useSelector((state) => state.deco);


    const tax = timeInfo.total * 0.05;

    const totalPrice = timeInfo.total + tax;

     const procesedNext = () => {
        history.push("/login?redirect=process/payment")
     }

    return (

        <Fragment>
            <MetaData title={"ConfirmEvent"} />

            <form onSubmit={procesedNext} className="confirmOrderPage">

                <div>
                    <div className="confirmCartItems">

                        <Typography>Venue Info</Typography>
                        <div className="confirmCartItemsContainer">

                            {cartItems &&
                                cartItems.map((cartItems) => (
                                    <div>
                                        <img src={cartItems.image} alt="venue" />
                                        <div>
                                            <p>Venue Booked At</p>
                                            <span>{timeInfo.selectedDate} & {timeInfo.selectedTime}</span>
                                        </div>
                                        <div>
                                            <p>Id</p>
                                            <span>{cartItems.venue}</span>
                                        </div>
                                        <div>
                                            <p>Name</p>
                                            <span>{cartItems.name}</span>
                                        </div>
                                        <div>
                                            <p>Address</p>
                                            <span>{cartItems.address}</span>
                                        </div>
                                        <div>
                                            <p>Price</p>
                                            <span>{cartItems.price}</span>
                                        </div>
                                    </div>

                                ))}
                        </div></div>
                    <div className="confirmCartItems">

                        <Typography>Decoration Info</Typography>
                        <div className="confirmCartItemsContainer">

                            {decoItems &&
                                decoItems.map((decoItems) => (
                                    <div>
                                        <img src={decoItems.image} alt="deco" />
                                        <div>
                                            <p>Type</p>
                                            <span>{decoItems.type}</span>
                                        </div>
                                        <div>
                                            <p>Description</p>
                                            <span>{decoItems.description}</span>
                                        </div>
                                        <div>
                                            <p>Price</p>
                                            <span>{decoItems.price}</span>
                                        </div>

                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="confirmCartItems">

                        <Typography>Caterer Info</Typography>
                        <div className="confirmCartItemsContainer">

                            {catItems &&
                                catItems.map((catItems) => (
                                    <div>
                                        <img src={catItems.image} alt="cat" />
                                        <div>
                                            <p>Id</p>
                                            <span>{catItems.type}</span>
                                        </div>
                                        <div>
                                            <p>Description</p>
                                            <span>{catItems.description}</span>
                                        </div>
                                        <div>
                                            <p>Price</p>
                                            <span>{catItems.price}</span>
                                        </div>
                                        <div>
                                            <p>Total Plates</p>
                                            <span>{timeInfo.guest}</span>
                                        </div>
                                    </div>
                                ))}

                        </div>
                    </div>
                </div>

                <div>
                    <div className="orderSummary">
                        <Typography>Event Summery</Typography>
                        <div>
                            <div>
                                <p>SubTotal : </p>
                                <span>₹{timeInfo.total}</span>
                            </div>
                            <div>
                                <p>GST : </p>
                                <span>₹{tax}</span>
                            </div>

                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>
                                    Total :
                                </b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>
                        <button>Proceed To Payment</button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}

export default ConfirmEvent;
