import { Fragment } from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData";



function VenueData({ venue }) {

    
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
              <MetaData title={venue.name} />
      <Link className="back card mb-3" to={`/venue/${venue._id}`}>
<div className="row g-0">
    <div className="col-md-4">
        <img
            src={venue.images[0].url} 
            alt={venue.name}
            className="img-fluid rounded-start"
        />
    </div>
    <div className="col-md-8">
        <div className="card-body">
            <h5 className="c card-title">{venue.name}</h5>
            <p className="c card-text">
                {venue.description}
            </p>
            <p className="c card-text">
            ₹{venue.price}
            </p>
            <p className="card-text">
                <small className="text-muted">capacity : {venue.capacity}</small>
            </p>
            <p className='Star'><ReactStars {...options} /></p>
            <p className="card-text">
                <small className="text-muted">{venue.numOfReviews} </small>
            </p>
        </div>
    </div>
</div>
</Link>

    </Fragment>
  );
}
   
export default VenueData;
