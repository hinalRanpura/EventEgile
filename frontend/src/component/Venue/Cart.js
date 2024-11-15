import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from "react";
import './Cart.css';
import CartItemCard from "./CartItemCard";
import CatItemCard from "./CatItemCard";
import DecoItemCard from "./DecoItemCard";
import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromCart, removeItemsFromCat, removeItemsFromDeco, saveDateInfo } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveEventCartIcon from "@material-ui/icons/EventBusy"
import { Link, useHistory } from "react-router-dom";

const Cart = () => {

    const dispatch = useDispatch();

    const { cartItems,dateInfo } = useSelector((state) => state.cart);
    const { catItems } = useSelector((state) => state.cat);
    const { decoItems } = useSelector((state) => state.deco);


    const [guest, setGuest] = useState(0);
    const [decoType, setDecoType] = useState("");

    let total = 0;

    let venueTotal = 0;
    let decoTotal = 0;
    let catTotal = 0;

    {
        decoItems && decoItems.map((item) => (
            decoTotal = decoTotal + item.price
        ))
    }

    {
        cartItems && cartItems.map((item) => (
            venueTotal = venueTotal + item.price
        ))
    }

    {
        catItems && catItems.map((item) => (
            catTotal = catTotal + item.price * guest
        ))
    }

    total = venueTotal + catTotal + decoTotal 

    let tax = total * 0.05;

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const deleteDecoItems = (id) => {
        dispatch(removeItemsFromDeco(id));
    }

    const deleteCatItems = (id) => {
        dispatch(removeItemsFromCat(id));
    }

    const history = useHistory();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([
        { date: '2023-02-25', time: 'slot1' },
        { date: '2023-02-24', time: 'slot2' },
    ]);

    const handleDateSelect = event => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSelect = time => {
        if (selectedTime.includes(time)) {
            setSelectedTime(selectedTime.filter(t => t !== time));
        } else {
            setSelectedTime([...selectedTime, time]);
        }
    };

    const isSlotBooked = (date, time) => {
        return bookedSlots.findIndex(
            slot => slot.date === date && slot.time === time
        ) !== -1;
    };


    const checkOutHandler = (e) => {
        e.preventDefault();

        dispatch(saveDateInfo({ selectedDate,selectedTime,total,guest,decoType,tax }))

        history.push("/login?redirect=confirmEvent");
    };


    return (
        <Fragment>
            {cartItems.length === 0 ?
                <div className="emptyCart">
                    <RemoveEventCartIcon />
                    <br />
                    <Typography>NOTHING IS SELECTED</Typography>
                    <br />
                    <Link to="/venues">View Venues</Link>
                </div> :
                (<Fragment>
                    <form onSubmit={checkOutHandler} className="cartPage">
                        <div className="cartHeader">
                            <p>Venue</p>
                            <p>Date & Slot</p>
                            <p>SubTotal</p>
                        </div>

                        {cartItems && cartItems.map((item) => (
                            <div className="cartContainer" key={item.venue}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartDate">
                                    <div>
                                        Select Date
                                        <input
                                            type="date"
                                            required={true}
                                            value={selectedDate}
                                            onChange={handleDateSelect}
                                        />
                                    </div>
                                    <p>Select Slot</p>
                                    {selectedDate && (
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTime.includes('slot1')}
                                                    disabled={isSlotBooked(selectedDate, 'slot1')}
                                                    onChange={() => handleTimeSelect('slot1')}
                                                />
                                                Slot 1 : 07:00 to 03:30
                                            </label>
                                            <br />
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTime.includes('slot2')}
                                                    disabled={isSlotBooked(selectedDate, 'slot2')}
                                                    onChange={() => handleTimeSelect('slot2')}
                                                />
                                                Slot 2 : 04:00 to 12:00
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className="cartSubtotal">
                                    {`${item.price}`}
                                </div>
                            </div>
                        ))}

                        <div className="cartHeader">
                            <p>Decoration</p>
                            <p></p>
                            <p>SubTotal</p>
                        </div>

                        {decoItems && decoItems.map((item) => (
                            <div className="cartContainer" key={item.decoration}>
                                <DecoItemCard item={item} deleteDecoItems={deleteDecoItems} />
                                <div className="signUpRole">
                                    <p className="func">Select Function Type </p>
                                    <select
                                        required={true}
                                        onChange={(e) => setDecoType(e.target.value)}
                                        name="decoType">
                                        <option>Select</option>
                                        <option value="wedding">wedding</option>
                                        <option value="reception">reception</option>
                                        <option value="sangeet">sangeet</option>
                                        <option value="cocktail_party">cocktail_party</option>
                                        <option value="haldi">haldi</option>
                                        <option value="mehndi">mehndi</option>
                                        <option value="engagement">engagement</option>
                                        <option value="birthday">birthday</option>
                                        <option value="anniversary">anniversary</option>
                                        <option value="mundan">mundan</option>
                                    </select>
                                </div>
                                <div className="cartSubtotal">{item.price}</div>

                            </div>

                        ))}




                        <div className="cartHeader">
                            <p>Catering</p>
                            <p>NumOfGuests</p>
                            <p>SubTotal</p>
                        </div>
                        {catItems && catItems.map((item) => (
                            <div className="cartContainer" key={item.catrere}>
                                <CatItemCard item={item} deleteCatItems={deleteCatItems} />
                                <div>
                                    <div className="cartInput">
                                        <input type="number"
                                            name="guest"
                                            required={true}
                                            onChange={(e) => setGuest(e.target.value)} />
                                    </div>
                                </div>
                                <div className="cartSubtotal">{item.price * guest}</div>
                            </div>

                        ))}
                        <div>
                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <p>{total}</p>

                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Fragment>)
            }
        </Fragment>
    );
}

export default Cart;
