import { Fragment } from 'react';
import  "./Home.css";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";



function Venue({venue}) {

  const options = {
    edit: false,
    color:"rgb(194, 194, 194)",
    activeColor: "rgb(242, 255, 0)",
    value:venue.ratings,
    isHalf:true,
    size:window.innerWidth < 600 ? 20 : 25,
};

  return (
    <Fragment>
        <Link className='venueCard' to={`/venue/${venue._id}`}>
            <img src={venue.images[0].url} alt={venue.name}/>
            <p>{venue.name}</p>
            <div>
                <ReactStars {...options} /> <span>{venue.numOfReviews} reviews</span>
            </div>
            <span>₹{venue.price}</span>
        </Link>
    </Fragment>
  );
}
   
export default Venue;
