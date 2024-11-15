import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/EventAvailable";
import SideBar from "./ManagerSidebar";   
import { getManagerEvent,clearErrors } from "../../actions/eventAction";
import { Button } from "@material-ui/core";


const Events = ({ history }) => {
  
  const dispatch = useDispatch();

  const { error,events } = useSelector((state) => state.allEvents);

  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }

    dispatch(getManagerEvent());
}, [dispatch, alert, error, history]);

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 100, flex: 0.3 },
    { field: "status",headerName: "Status",minWidth: 150,flex: 0.2 },
    { field: "date",headerName: "Date",minWidth: 150,flex: 0.2 },
    { field: "numOfGuest",headerName: "Guest",minWidth: 150,flex: 0.  },
    { field: "funcType", headerName: "funcType", minWidth: 150, flex: 0.2 },
    { field: "price",headerName: "Price",type: "number",minWidth: 150,flex: 0.2 },
    {
      field: "actions",
      flex: 0.4,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/manager/event/view/${params.getValue(params.id, "id")}`}>
              <ViewIcon />
            </Link>
            <Button></Button>
            <Link to={`/manager/event/update/${params.getValue(params.id, "id")}`}>
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
          price: item.total,
          numOfGuest: item.numOfGuest,
          funcType: item.funcType,
          date:item.eventAt,
          status:item.eventStatus
      });
  });
  return (
    <Fragment>
      <MetaData title={`ALL EVENTS - MANAGER`} />

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

export default Events;