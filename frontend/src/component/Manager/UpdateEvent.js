import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import SideBar from "./ManagerSidebar";
import { Button } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_EVENT_RESET } from "../../consants/eventConstants";
import { getEventDetails, clearErrors, updateEvent } from "../../actions/eventAction";
import { useState, useEffect } from "react";

const UpdateEvent = ({ history,match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { event, error } = useSelector((state) => state.eventDetails);

    const { loading,error: updateError,isUpdated } = useSelector((state) => state.hello);

    const [type, setType] = useState("");
    
    const eventId = match.params.id; 

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

       if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("event Updated Successfully");
            history.push("/manager/events");
            dispatch({ type: UPDATE_EVENT_RESET });
        }
    }, [dispatch,
        alert,
        error,
        history,
        isUpdated,
        eventId,
        event,
        updateError
    ]);

        const updateDecorationSubmitHandler = (e) => {
            e.preventDefault();
    
            const myForm = new FormData();
    
            myForm.set("type", type);

    
            dispatch(updateEvent(eventId, myForm));
        };
    return (
        <Fragment>
            <MetaData title={`Update Event Status - MANAGER`} />
            <div className="dashboard">
                <SideBar />
                <div className="newVenueContainer">
                    <form
                        className="createVenueForm"
                        encType="multipart/form-data"
                        onSubmit={updateDecorationSubmitHandler}
                    >
                        <h1>Update Event Status</h1>

                        <div className="signUpRole">
                            <CategoryIcon />
                            <select
                                required
                                onChange={(e) => setType(e.target.value)}
                                name="type">
                                <option>Select</option>
                                <option value="completed">Completed</option>
                                <option value="cancel">Cancel</option>
                            </select>
                        </div>

                        <Button
                            id="createVenueBtn"
                            type="submit"                        >
                            UPDATE
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateEvent;