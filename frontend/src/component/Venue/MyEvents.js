import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myEvents.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myEvents } from "../../actions/eventAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyEvents = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, events } = useSelector((state) => state.myEvents);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 300, flex: 1 },

    {
      field: "eventStatus",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/event/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  events &&
    events.forEach((item, index) => {
      rows.push({
        id: item._id,
        eventStatus: item.eventStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myEvents());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Events`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Events</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyEvents;