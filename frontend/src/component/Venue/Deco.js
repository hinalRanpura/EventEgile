import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import "./VenueDetails.css";
import MetaData from "../layout/MetaData";
import DecoCard from "./DecoCard.js";
import CatCard from "./CatCard.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getDecorationByManId } from "../../actions/decorationAction"
import { getCatererByManId } from "../../actions/catererAction"
const Deco = ({ history }) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const user = cartItems[0].user;

    const { error, decorations } = useSelector((state) => state.decorations);
    const { caterers } = useSelector((state) => state.caterers);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getDecorationByManId(user));
        dispatch(getCatererByManId(user));

    }, [dispatch, alert, error, history]);

    const proceedHandler = () => {
        history.push("/select/my");
    }

    return (
        <Fragment>
            <MetaData title="Select" />
            <Link to={"/select/my"}>Skip</Link>
            <div>
                <h2 className="deco">Select Decoration Type</h2>

                <div className="reviews">
                    {decorations &&
                        decorations.map((decorations) => (
                            <DecoCard key={decorations._id} deco={decorations} />
                        ))}
                </div>
            </div>
            <div>
                <h2 className="deco">Select Caterer Type</h2>

                <div className="reviews">
                    {caterers &&
                        caterers.map((caterers) => (
                            <CatCard key={caterers._id} cat={caterers} />
                        ))}      
                </div>
            </div>

            <button className="but" onClick={proceedHandler}>Proceed</button>
        </Fragment>
    );
};

export default Deco;