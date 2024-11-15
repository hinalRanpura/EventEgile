import React, { Fragment, useEffect, useState } from "react";
import "./CreateVenue.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateVenue, getVenueDetails } from "../../actions/venueAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import SideBar from "./ManagerSidebar";
import { Link } from "react-router-dom";
import { UPDATE_VENUE_RESET } from "../../consants/venueConsants";

const UpdateVenue = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { venue, error } = useSelector((state) => state.venueDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
      } = useSelector((state) => state.venue);
    

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    
    const venueId = match.params.id;

      useEffect(() => {
        if (venue && venue._id !== venueId) {
            dispatch(getVenueDetails(venueId));
          } else {
            setName(venue.name);
            setDescription(venue.description);
            setPrice(venue.price);
            setCapacity(venue.capacity);
            setAddress(venue.address);
            setOldImages(venue.images);
          }

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
          }
      
          if (isUpdated) {
            alert.success("Venue Updated Successfully");
            history.push("/manager/Venue");
            dispatch({ type: UPDATE_VENUE_RESET });
          }
      }, [ dispatch,
        alert,
        error,
        history,
        isUpdated,
        venueId,
        venue,
        updateError]);

    const updateVenueSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("capacity", capacity);
        myForm.set("address", address);

        images.forEach((images) => {
            myForm.append("images", images);
        });

        dispatch(updateVenue(venueId, myForm));
    };

    const updateVenueImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Update Venue" />
            <div className="dashboard">
                <SideBar />
                <div className="newVenueContainer">
                <div className="back">
              <Link to={`/manager/Venue`}>
                <ArrowBackIosSharpIcon />
              </Link>
              </div>
                    <form
                        className="createVenueForm"
                        encType="multipart/form-data"
                        onSubmit={updateVenueSubmitHandler}
                    >
                        <h1>Update Venue</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Venue Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder="Venue Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <input
                                type="number"
                                placeholder="Capacity"
                                required
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div id="createVenueFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateVenueImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createVenueFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Venue Preview" />
                ))}
            </div>

                        <div id="createVenueFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Venue Preview" />
                            ))}
                        </div>

                        <Button
                            id="createVenueBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateVenue;