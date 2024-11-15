import React, { Fragment, useState, useEffect } from "react";
import "./ManagerDashboard.css";
import AdminSidebar from "./ManagerSidebar"
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getManagerDecoration } from "../../actions/decorationAction";
import { getManagerVenue } from "../../actions/venueAction";
import { getManagerCaterer } from "../../actions/catererAction";

const ManagerDashboard = () => {

  const dispatch = useDispatch();

  const { decorations } = useSelector((state) => state.decorations);
  const { caterers } = useSelector((state) => state.caterers);
  const { venues  } = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(getManagerVenue());
    dispatch(getManagerDecoration());
    dispatch(getManagerCaterer());
  }, [dispatch]);

  let venue=venues && venues.length;
  let caterer=caterers && caterers.length;
  let decoration=decorations && decorations.length;

 
  const doughnutState = {
    labels : ["Venue","Decoration","Catrer"],
    datasets: [
      {
        backgroundColor: ["#14A6B4","#7901B4","#35015E"],
        hoverBackgroundColor: ["#4B5000","#35014F","#00B9B4"],
        data: [venue,decoration,caterer],
      },
    ]
  }

    return (
        <Fragment>
            <MetaData title={"Manager Dashboard"}/>
            <div className="dashboard">
                <AdminSidebar />
                <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboardSummary">
                  <div className="dashboardSummaryBox2">
                    <Link to="/manager/Venue">
                      <p>Venue</p>
                      <p>{venues && venues.length}</p>
                    </Link>
                    <Link to="/manager/Caterer">
                      <p>Caterer</p>
                      <p>{caterers && caterers.length}</p>
                    </Link>
                    <Link to="/manager/Decoration">
                      <p>Decoration</p>
                      <p>{decorations && decorations.length}</p>
                    </Link>
                  </div>
                </div>
                <div className="doughnutChart">
                  <Doughnut data={doughnutState} />
                </div>
            </div>
            </div>
        </Fragment>
    );
};

export default ManagerDashboard;