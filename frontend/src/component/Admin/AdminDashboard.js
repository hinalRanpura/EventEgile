import React, { Fragment, useEffect } from "react";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar"
import MetaData from "../layout/MetaData";
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../actions/userAction";
import { getAdminVenue } from "../../actions/venueAction";
import { getAllEvents } from "../../actions/eventAction";

const AdminDashboard = () => {

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.allUsers);
  const { venues } = useSelector((state) => state.venues);
  const { events } = useSelector((state) => state.allEvents);
  
  useEffect(() => {
    
    dispatch(getAllUser());
    dispatch(getAdminVenue());
    dispatch(getAllEvents());

  }, [dispatch]);

  let Manager=0;
  users && users.forEach((item) => {
    if(item.role === "manager"){
      Manager +=1;
    }
  });

  let Customer=0;
  users && users.forEach((item) => {
    if(item.role === "user"){
      Customer +=1;
    }
  });

  let amount = 0;
  events && events.forEach((item) => {
    amount += item.total
  });
  const lineState = {
    labels : ["Initial Amount","Amout Earned"],
    datasets: [
      {
        label: "Total Amount",
        //backgroundColor:["#00A6B4"],
        backgroundColor:["rgba(53, 162, 235, 0.5)"],
        borderColor:["white"],
        hoverBackgroundColor:["rgba(53, 162, 235, 0.5)"],
        data: [0,amount],
      },
    ],
  }

 
  const doughnutState = {
    labels : ["Customer","Event Manager"],
    datasets: [
      {
        backgroundColor: ["#00A6B4","#6800B4"],
        hoverBackgroundColor: ["#4B5000","#35014F"],
        data: [Customer,Manager],
      },
    ]
  }

    return (
        <Fragment>
            <MetaData title={"Admin Dashboard"}/>
            <div className="dashboard">
                <AdminSidebar />
                <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboardSummary">
                  <div>
                    <p>Total Amount <br /> ₹ {amount}</p>
                  </div>
                  <div className="dashboardSummaryBox2">
                    <Link to="/admin/venues">
                      <p>Venue</p>
                      <p>{venues && venues.length}</p>
                    </Link>
                    <Link to="/admin/events">
                      <p>Events</p>
                      <p>{events && events.length}</p>
                    </Link>
                    <Link to="/admin/users">
                      <p>Users</p>
                      <p>{users && users.length}</p>
                    </Link>
                  </div>
                </div>
                
                <div className="doughnutChart">
                  <Doughnut data={doughnutState} />
                </div>
                
                <div className="lineChart">
                    <Line data={lineState} />
                </div>

               
            </div>
            </div>
        </Fragment>
    );
};

export default AdminDashboard;