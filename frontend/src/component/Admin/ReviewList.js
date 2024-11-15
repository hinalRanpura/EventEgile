import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./AdminSidebar";   


const ReviewList = ({ history }) => {
  
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "user",
      headerName: "Manager",
      minWidth: 150,
      flex: 0.3,
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
              <EditIcon />
            </Link>

            <Button
              
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  /*
  onClick={() =>
                deleteVenueHandler(params.getValue(params.id, "id"))
              }
  */
  const rows = [];

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="userContainer">
          <h1 id="userHeading">ALL REVIEWS</h1>

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

export default ReviewList;