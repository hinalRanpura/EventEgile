import React, { Fragment, useEffect } from "react";
import "./Venues.css";
import ManagerSidebar from "./ManagerSidebar";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { clearErrors, deleteDecoration, getManagerDecoration } from "../../actions/decorationAction";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";  
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/ViewCarousel";
import DeleteIcon from "@material-ui/icons/Delete";

const Decoration = ({ history }) => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const { error, decorations } = useSelector((state) => state.decorations);
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getManagerDecoration());
    }, [dispatch, alert, error, history]);

    const deleteDecorationHandler = (id) => {
        dispatch(deleteDecoration(id));
        alert.success("Deleted succesfuuly");
      };

    const columns = [
        { field: "id", headerName: "Decoration ID", minWidth: 100, flex: 0.4 },
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
                        <Link to={`/manager/decoration/view/${params.getValue(params.id, "id")}`}>
                            <ViewIcon />
                        </Link>
                        <Button
                        onClick={() =>
                            deleteDecorationHandler(params.getValue(params.id, "id"))
                          }
                        >
                            <DeleteIcon />
                        </Button>
                        <Link to={`/manager/decoration/update/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                    </Fragment>
                );
            },
        },
    ];
 
    const rows = [];
   
    decorations &&
        decorations.forEach((item) => {
            rows.push({
                id: item._id,
                price: item.price,
                description: item.description,
                type: item.type
            });
        });
    return (
        <Fragment>
            <MetaData title={"Decoration's Page"} />
            <div className="dashboard">
                <ManagerSidebar />
                <div className="dashboardContainer">
                    <Typography component="h1">Decoration Plans</Typography>

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

export default Decoration;