import { Fragment } from 'react';
import './Home.css';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded"
import Loader from "../layout/Loader/Loader"
import Venue from "./Venue"
import { useDispatch, useSelector } from "react-redux";
import { getVenue } from '../../actions/venueAction';
import { CLEAR_ERRORS } from '../../consants/venueConsants';

function Home() {

  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, error, venues, venueCount } = useSelector(
    (state) => state.venues
  )

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERRORS())
    }

    dispatch(getVenue());

  }, [dispatch, error, alert])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (

        <Fragment>
          <MetaData title="Agile" />
          <div className='carsoule'>
            <Carousel autoPlay={true} showThumbs={false} showIndicators={false}>
              <div>
                <img src={require("../../assets/h6.jpg")} alt=".." />
              </div>
              <div>
                <img src={require("../../assets/h2.jpg")} alt=".." />
              </div>
              <div>
                <img src={require("../../assets/h3.jpg")} alt=".." />
              </div>
              <div>
                <img src={require("../../assets/h4.jpg")} alt=".." />
              </div>
              <div>
                <img src={require("../../assets/h5.jpg")} alt=".." />
              </div>
              <div>
                <img src={require("../../assets/h1.jpg")} alt=".." />
              </div>
            </Carousel>
          </div>


          <div className='venue'>Populer Venues<hr /></div>

          <div className='container' id="container">
            {venues && venues.map((venues) => <Venue venue={venues} />)}
          </div>


<div className='card'>
<iframe
                title="unique"
                align="right"
                width="1515vmax"
                height="550px"
                src="https://momento360.com/e/u/eb190d352c99475eb0dd38e6e18dc4bd?utm_campaign=embed&utm_source=other&heading=43.5&pitch=0&field-of-view=75&size=medium"
                frameborder="0"
              ></iframe>
</div>
          <div className="card">
            <img src={require("../../assets/h7.webp")} className="card-img" alt="..." height="500vmax" />
            <div className="card-img-overlay">
              <h5 className="card-title">Who we are?</h5><br />
              <h2 className="card-text">We build <br />your special moments <br /> more memorable</h2><br />

              <p className='card-text'>Event Agile is Event <br />Organizing company which will <br />help you to make your special<br /> days more memorable </p>
              <div className='card-text b'><div className="a">Get to Know Us</div><a href="/aboutus" className="icon"><ArrowForwardRoundedIcon /></a></div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
};

export default Home;
