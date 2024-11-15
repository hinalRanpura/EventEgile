import React, { Fragment, useState, useEffect } from "react";
import "../Venue/VenueDetails.css";
import ReactStars from "react-rating-stars-component";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getCatererDetails } from '../../actions/catererAction';
import Loader from "../layout/Loader/Loader"
import { CLEAR_ERRORS } from '../../consants/catererConstants';
import { Link, useHistory } from 'react-router-dom';
import BackIcon from "@material-ui/icons/ArrowBack"

const ViewCaterer = ({ match }) => {
    const alert = useAlert();

    const dispatch = useDispatch();

    const { caterer, loading, error } = useSelector(
        (state) => state.catererDetails
    )

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERRORS())
        }
        dispatch(getCatererDetails(match.params.id));

    }, [dispatch, match.params.id, alert, error])

    return (
        <Fragment>
        {loading ? (<Loader />) : (
            <Fragment>
                <Link to={`/manager/Caterer`}><BackIcon /></Link>
                <form>
                <div className='VenueDetails'>
                    <h3 className='det'>Caterer</h3>
                    <div>
                        <p># {caterer._id}
                        </p>
                        <div className='detailsBlock-4'>
                            <hr />
                            Type : {caterer.type}
                            <hr />
                        </div>
                        <div className='detailsBlock-3'>
                            <h1>{`₹${caterer.price}`}</h1>
                        </div>
                        <div className='detailsBlock-4'>
                            <hr />
                            Description : {caterer.description}
                            <hr />
                        </div>
                        <div className='detailsBlock-4'>
                            <hr />
                            Created By : {caterer.user}
                            <hr />
                        </div>
                        <div className='detailsBlock-4'>
                            <hr />
                            Created At : {caterer.createdAt}
                            <hr />
                        </div>
                        <div className='caterer'>Photos<hr /></div>

                        {caterer.images && caterer.images[0] ? (
                            <section className='gallery'>
                                <div className='container-lg'>
                                    <div className='row'>
                                        {caterer.images && caterer.images.map((item, i) => (
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

export default ViewCaterer;