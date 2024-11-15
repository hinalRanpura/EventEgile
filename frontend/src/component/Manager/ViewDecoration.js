import React, { Fragment, useState, useEffect } from "react";
import "../Venue/VenueDetails.css";
import ReactStars from "react-rating-stars-component";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getDecorationDetails } from '../../actions/decorationAction';
import Loader from "../layout/Loader/Loader"
import { CLEAR_ERRORS } from '../../consants/decorationConstants';
import { Link, useHistory } from 'react-router-dom';
import BackIcon from "@material-ui/icons/ArrowBack"

const ViewDecoration = ({ match }) => {
    const alert = useAlert();

    const dispatch = useDispatch();

    const { decoration, loading, error } = useSelector(
        (state) => state.decorationDetails
    )

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERRORS())
        }
        dispatch(getDecorationDetails(match.params.id));

    }, [dispatch, match.params.id, alert, error])

    return (
        <Fragment>
        {loading ? (<Loader />) : (
            <Fragment>
                <Link to={`/manager/Decoration`}><BackIcon /></Link>
                <form>
                <div className='VenueDetails'>
                    <h3 className='det'>Decoration</h3>
                    <div>
                        <p># {decoration._id}
                        </p>
                        <div className='detailsBlock-4'>
                            <hr />
                            Type : {decoration.type}
                            <hr />
                        </div>
                        <div className='detailsBlock-3'>
                            <h1>{`₹${decoration.price}`}</h1>
                        </div>
                        <div className='detailsBlock-4'>
                            <hr />
                            Description : {decoration.description}
                            <hr />
                        </div>
                        <div className='detailsBlock-4'>
                            <hr />
                            Created By : {decoration.user}
                            <hr />
                        </div>
                        <div className='detailsBlock-4'>
                            <hr />
                            Created At : {decoration.createdAt}
                            <hr />
                        </div>
                        <div className='decoration'>Photos<hr /></div>

                        {decoration.images && decoration.images[0] ? (
                            <section className='gallery'>
                                <div className='container-lg'>
                                    <div className='row'>
                                        {decoration.images && decoration.images.map((item, i) => (
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

export default ViewDecoration;