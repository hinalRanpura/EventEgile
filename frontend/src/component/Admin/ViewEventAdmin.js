import React, { Fragment, useEffect } from "react";
import "../Venue/EventDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getEventDetails, clearErrors } from "../../actions/eventAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const ViewEventAdmin = ({ match }) => {
  const { event, error, loading } = useSelector((state) => state.eventDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getEventDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Event Details" />
              <div className="ProductDetails">
              <div>
                <Typography className="ab">Event Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Id</p>
                    <span>{event._id && event._id}</span>
                  </div>
                  <div>
                    <p>Date:</p>
                    <span>{event.eventAt && event.eventAt}</span>
                  </div>
                  <div>
                    <p>Time:</p>
                    <span>
                      {event.timeSlot && event.timeSlot}
                    </span>
                  </div>
                </div>

                <Typography className="ab">Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <b className="pay">
                      {event.paymentInfo &&
                        event.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </b>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{event.totalPrice && event.totalPrice}</span>
                  </div>
                </div>

                <Typography className="ab">event Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        event.eventStatus && event.eventStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {event.eventStatus && event.eventStatus}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Typography className="ab">Venue Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>
                      {event.venueName && event.venueName}
                    </span>
                  </div>
                  <div>
                    <p>Price</p>
                    <span>
                      {event.venuePrice && event.venuePrice}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {event.venueAddress && event.venueAddress}
                    </span>
                  </div>
                  <div>
                    <p>Name:</p>
                    <span>
                      {event.venueName && event.venueName}
                    </span>
                  </div>
                </div>

                <Typography className="ab">Catering Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Food Type:</p>
                    <span>{event.catType && event.catType}</span>
                  </div>
                  <div>
                    <p>Price P/P:</p>
                    <span>
                      {event.catPrice && event.catPrice}
                    </span>
                  </div>
                  <div>
                    <p>numOfGuest:</p>
                    <span>
                      {event.numOfGuest && event.numOfGuest}
                    </span>
                  </div>
                </div>

                <Typography className="ab">Decoration Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Decoration Type:</p>
                    <span>{event.decoType && event.decoType}</span>
                  </div>
                  <div>
                    <p>Function Type:</p>
                    <span>
                      {event.funcType && event.funcType}
                    </span>
                  </div>
                  <div>
                    <p>Price:</p>
                    <span>
                      {event.decoPrice && event.decoPrice}
                    </span>
                  </div>
                </div>

              </div>
              </div>
            
        </Fragment>
      )}
    </Fragment>
  );
};

export default ViewEventAdmin;