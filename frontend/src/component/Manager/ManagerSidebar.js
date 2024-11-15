import React from "react";
import "./ManagerSidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ViewAgendaSharpIcon from "@material-ui/icons/ViewAgendaSharp";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const ManagerSidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/manager/dashboard">
                <p>
                    <DashboardIcon />Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Create">
                        <Link to="/manager/createVenue">
                            <TreeItem nodeId="2" label="Venue" icon={<AddIcon />}/>
                        </Link>
                        <Link to="/manager/createCaterer">
                            <TreeItem nodeId="3" label="Caterer" icon={<AddIcon />}/>
                        </Link>
                        <Link to="/manager/createDecoration">
                            <TreeItem nodeId="4" label="Decoration" icon={<AddIcon />}/>
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ViewAgendaSharpIcon />}
                >
                    <TreeItem nodeId="1" label="View">
                        <Link to="/manager/Venue">
                            <TreeItem nodeId="2" label="Venue" icon={<AddIcon />}/>
                        </Link>
                        <Link to="/manager/Caterer">
                            <TreeItem nodeId="3" label="Caterer" icon={<AddIcon />}/>
                        </Link>
                        <Link to="/manager/Decoration">
                            <TreeItem nodeId="4" label="Decoration" icon={<AddIcon />}/>
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/manager/events"><p><ListAltIcon />Events</p></Link>
            <Link to="reviews"><p><RateReviewIcon />Reviews</p></Link>

        </div>
    );
};

export default ManagerSidebar;