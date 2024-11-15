import React, { Fragment, useState, useEffect } from "react";
import "./Venues.css";
import "../Venue/VenueDetails.css";
import ReactStars from "react-rating-stars-component";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getVenueDetails } from '../../actions/venueAction';
import Loader from "../layout/Loader/Loader"
import { CLEAR_ERRORS } from '../../consants/venueConsants';
import { Link, useHistory } from 'react-router-dom';
import BackIcon from "@material-ui/icons/ArrowBack"

const ViewVenue = ({ match }) => {
    const alert = useAlert();

    const dispatch = useDispatch();

    const { venue, loading, error } = useSelector(
        (state) => state.venueDetails
    )

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERRORS())
        }
        dispatch(getVenueDetails(match.params.id));

    }, [dispatch, match.params.id, alert, error])


   const options = {
        edit: false,
        color: "rgb(194, 194, 194)",
        activeColor: "rgb(242, 255, 0)",
        value: venue.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 30 : 35,
        align: "center"
    };
   
    return (
        <Fragment>
        {loading ? (<Loader />) : (
            <Fragment>
                <Link to={`/manager/Venue`}><BackIcon /></Link>
                <form>
                <div className='VenueDetails'>
                    <h2 className='det'>{venue.name}</h2>
                    <div>
                        <p><b>Venue</b> # {venue._id}
                        </p>
                        <div className='detailsBlock-4'>
                            <hr />
                            Address : {venue.address}
                            <hr />
                        </div>
                        <div className='detailsBlock-3'>
                            <h1>{`₹${venue.price}`}</h1>
                        </div>
                        <div className='deta'>
                            <div className='star'><ReactStars {...options} /></div>
                            <span className='st'>({venue.numOfReviews} Reviews)</span>
                        </div>

                        <div className='detailsBlock-4'>
                            <hr />
                            Description : {venue.description}
                            <hr />
                        </div>
    
                        <div className='venue'>Photos<hr /></div>

                        {venue.images && venue.images[0] ? (
                            <section className='gallery'>
                                <div className='container-lg'>
                                    <div className='row'>
                                        {venue.images && venue.images.map((item, i) => (
                                            <div className='col'>
                                                <img key={item.url}
                                                    src={item.url} className='gallery-item' alt="gallaey" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <p className="noReviews">No Photos yet</p>
                        )}
                    </div>
                </div>
                </form>
            </Fragment>
        )}
    </Fragment>
    );
};

export default ViewVenue;