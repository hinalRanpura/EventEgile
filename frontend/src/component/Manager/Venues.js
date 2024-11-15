import React, { Fragment, useEffect } from "react";
import "./Venues.css";
import ManagerSidebar from "./ManagerSidebar";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { clearErrors, deleteVenue, getManagerVenue } from "../../actions/venueAction";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/ViewCarousel";
import DeleteIcon from "@material-ui/icons/Delete";

const Venues = ({ history }) => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, error, venues  } = useSelector((state) => state.venues);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getManagerVenue());
    }, [dispatch, alert, error, history]);

    const deleteVenueHandler = (id) => {
        dispatch(deleteVenue(id));
      };

    const columns = [
        { field: "id", headerName: "Venue ID", minWidth: 100, flex: 0.4 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.2,
        },
        {
            field: "description",
            headerName: "Description",
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
                        <Link to={`/manager/venue/view/${params.getValue(params.id, "id")}`}>
                            <ViewIcon />
                        </Link>
                        <Button
                        onClick={() =>
                            deleteVenueHandler(params.getValue(params.id, "id"))
                          }
                        >
                            <DeleteIcon />
                        </Button>
                        <Link to={`/manager/venue/update/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

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
                price: item.price,
                name: item.name,
                address: item.address,
                description: item.description
            });
        });
    return (
       <Fragment>
        {loading ? <Loader /> : (
             <Fragment>
                <MetaData title={"Venues"} />
             <div className="dashboard">
                 <ManagerSidebar />
                 <div className="dashboardContainer">
                     <Typography component="h1">Venue</Typography>
 
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
        )}
       </Fragment>
    );
};

export default Venues;