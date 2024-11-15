import React from "react";
import "./AdminSidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const AdminSidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon />Dashboard
                </p>
            </Link>
            <Link to="/admin/venues"><p><ListAltIcon />Venues</p></Link>
            <Link to="/admin/cateres"><p><ListAltIcon />Caterers</p></Link>
            <Link to="/admin/decorations"><p><ListAltIcon />Decorations</p></Link>
            <Link to="/admin/events"><p><ListAltIcon />Events</p></Link>
            <Link to="/admin/users"><p><PeopleIcon />Users</p></Link>

        </div>
    );
};

export default AdminSidebar;