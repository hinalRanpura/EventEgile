//Main Detail Page

import { Fragment } from 'react';
import "./VenueDetails.css";
import ReactStars from "react-rating-stars-component";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getVenueDetails } from '../../actions/venueAction';
import { addDetailsToCart } from "../../actions/cartAction";
import Loader from "../layout/Loader/Loader"
import ReviewCard from "./ReviewCard.js";
import { CLEAR_ERRORS } from '../../consants/venueConsants';
import { useHistory } from 'react-router-dom';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../consants/venueConsants"
import { useState } from 'react';
import { newReview, clearErrors } from "../../actions/venueAction";

function VenueDetails({ match }) {

    const alert = useAlert();

    const history = useHistory();

    const dispatch = useDispatch();

    const { venue, loading, error } = useSelector(
        (state) => state.venueDetails
    )


    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const options = {
        edit: false,
        color: "rgb(194, 194, 194)",
        activeColor: "rgb(242, 255, 0)",
        value: venue.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 30 : 35,
        align: "center"
    };

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const bookingHandler = () => {
        dispatch(addDetailsToCart(match.params.id))
        history.push("/selectDeco")
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("venueId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERRORS())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getVenueDetails(match.params.id));

    }, [dispatch, match.params.id, alert, error, success, reviewError])


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                        <div className='VenueDetails'>
                            <h2 className='det'>{venue.name}</h2>

                            <div>
                                <Carousel autoPlay={true} showThumbs={false} showIndicators={false}>
                                    {venue.images && venue.images.map((item, i) => (
                                        <img
                                            className='CarouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                                </Carousel>
                            </div>
                            <div>
                                <p><b>Venue</b> # {venue._id}
                                    <button onClick={bookingHandler} className="submitReview">
                                        Book
                                    </button>                                </p>
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
                                <button onClick={submitReviewToggle} className="submitReview">
                                    Submit Review
                                </button>                                <br /><br /><br />
                                <h3 className="reviewsHeading">REVIEWS</h3>

                                <Dialog
                                    aria-labelledby="simple-dialog-title"
                                    open={open}
                                    onClose={submitReviewToggle}
                                >
                                    <DialogTitle>Submit Review</DialogTitle>
                                       <DialogContent className="submitDialog">
                                        <Rating
                                            onChange={(e) => setRating(e.target.value)}
                                            value={rating}
                                            size="large"
                                        />

                                        <textarea
                                            className="submitDialogTextArea"
                                            cols="30"
                                            rows="5"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={submitReviewToggle} color="secondary">
                                            Cancel
                                        </Button>
                                        <Button onClick={reviewSubmitHandler} color="primary">
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>


                                {venue.reviews && venue.reviews[0] ? (
                                    <div className="reviews">
                                        {venue.reviews &&
                                            venue.reviews.map((review) => (
                                                <ReviewCard key={review._id} review={review} />
                                            ))}
                                    </div>
                                ) : (
                                    <p className="noReviews">No Reviews Yet</p>
                                )}


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
                </Fragment>
            )}
        </Fragment>
    );
}

export default VenueDetails;
