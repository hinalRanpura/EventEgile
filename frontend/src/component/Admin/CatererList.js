import React, { Fragment, useEffect } from "react";
import "../Manager/Venues.css";
import ManagerSidebar from "./AdminSidebar";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { clearErrors, deleteCaterer, getCaterer } from "../../actions/catererAction";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";  
import ViewIcon from "@material-ui/icons/ViewCarousel";
import DeleteIcon from "@material-ui/icons/Delete";

const Caterer = ({ history }) => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const { error, caterers } = useSelector((state) => state.caterers);
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getCaterer());
    }, [dispatch, alert, error, history]);

    const deleteCatererHandler = (id) => {
        dispatch(deleteCaterer(id));
        alert.success("Deleted succesfuuly");
      };

    const columns = [
        { field: "id", headerName: "Caterer ID", minWidth: 100, flex: 0.4 },
        {
            field: "type",
            headerName: "Type",
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
                        <Link to={`/admin/caterer/view/${params.getValue(params.id, "id")}`}>
                            <ViewIcon />
                        </Link>
                        <Button
                        onClick={() =>
                            deleteCatererHandler(params.getValue(params.id, "id"))
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
   
    caterers &&
        caterers.forEach((item) => {
            rows.push({
                id: item._id,
                price: item.price,
                description: item.description,
                type: item.type,
                user:item.user
            });
        });
    return (
        <Fragment>
            <MetaData title={"Caterer's List "} />
            <div className="dashboard">
                <ManagerSidebar />
                <div className="dashboardContainer">
                    <Typography component="h1">Food Menu</Typography>

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

export default Caterer;