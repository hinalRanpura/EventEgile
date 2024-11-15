import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./AdminSidebar";
import { getAdminVenue ,clearErrors , deleteVenue} from "../../actions/venueAction"
import { DELETE_VENUE_RESET } from "../../consants/venueConsants";   
import ViewIcon from "@material-ui/icons/ViewCarousel";


const VenueList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, venues } = useSelector((state) => state.venues);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteVenueHandler = (id) => {
    dispatch(deleteVenue(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/admin/venues");
      dispatch({ type: DELETE_VENUE_RESET });
    }

    dispatch(getAdminVenue());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);
  

  const columns = [
    { field: "id", headerName: "Venue ID", minWidth: 100, flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.2,
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
          <Link to={`/admin/venue/${params.getValue(params.id, "id")}`}>
              <ViewIcon />
          </Link>
          <Button
          onClick={() =>
              deleteVenueHandler(params.getValue(params.id, "id"))
            }
          >
              <DeleteIcon />
          </Button>
      </Fragment>
        );
      },
    },
  ];

  const rows = [];

  venues &&
    venues.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.user,
        price: item.price,
        name: item.name,
        address: item.address,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL VENUES - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="userContainer">
          <h1 id="userHeading">ALL VENUES</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="userTable"
            autoHeight
            pageSize={6}
          />  
        </div>
      </div>
    </Fragment>
  );
};

export default VenueList;