import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./venuePage.css"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getVenue } from '../../actions/venueAction';
import { useAlert } from 'react-alert';
import { CLEAR_ERRORS } from '../../consants/venueConsants';
import VenueData from "./VenueData";
import Pagination from "react-js-pagination";

const VenuePage = ({ match }) => {

  const alert = useAlert();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { error, venues, venueCount, resultPerPage } = useSelector(
    (state) => state.venues
  )

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERRORS())
    }

    dispatch(getVenue(keyword,currentPage));

  }, [dispatch, error, alert, keyword,currentPage])

  return (  
    <Fragment>
      <MetaData title={"Venues"} />
      <div className="venue">
        {venues && venues.map((venues) => <VenueData key={venues._id} venue={venues} />)}
      </div>

      {resultPerPage < venueCount && (

        <div className="paginationBox">

            <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={venueCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>


      )}

    </Fragment>
  );
}

export default VenuePage;
