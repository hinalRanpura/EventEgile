import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Event";
import SideBar from "./AdminSidebar";   
import { clearErrors, getAllEvents } from "../../actions/eventAction";


const EventList = ({ history }) => {
  
  const dispatch = useDispatch();

  const { error, events } = useSelector((state) => state.allEvents);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors()); 
    }

    dispatch(getAllEvents());
  }, [dispatch, alert, error, history]);
  
  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 100, flex: 0.3 },
    { field: "date", headerName: "Date", minWidth: 100, flex: 0.3 },
    { field: "status",headerName: "Event Status",minWidth: 150,flex: 0.2 },
    { field: "price",headerName: "Price",type: "number",minWidth: 100,flex: 0.2 },
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
            <Link to={`/admin/event/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  events &&
    events.forEach((item) => {
      rows.push({
        id: item._id,
        price: item.totalPrice,
        status: item.eventStatus,
        date: item.eventAt,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL EVENTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="userContainer">
          <h1 id="userHeading">ALL EVENTS</h1>

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

export default EventList;