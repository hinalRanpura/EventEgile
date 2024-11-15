import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom"; 
import { Typography } from "@material-ui/core";
import './EventSuccess.css';
const Success = () => {
  return (
    <Fragment>
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography className="typography">Your Event is Confirmed</Typography>
            <Link to="/events">View Events</Link>
        </div>
    </Fragment>
  );
}

export default Success;
