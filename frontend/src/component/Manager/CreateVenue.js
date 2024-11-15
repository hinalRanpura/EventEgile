import React, { Fragment, useEffect, useState } from "react";
import "./CreateVenue.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, creatUpdateVenue } from "../../actions/venueAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./ManagerSidebar";

const CreateVenue = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
 
    const { loading, error, success } = useSelector((state) => state.newVenue);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Venue Created Successfully");
          history.push("/manager/dashboard");
        }
      }, [dispatch, alert, error, history, success]);

    const createVenueSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("capacity", capacity);
        myForm.set("address", address);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(creatUpdateVenue(myForm));
    };

    const createVenueImagesChange = (e) => {
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
            <MetaData title="Create Venue" />
            <div className="dashboard">
                <SideBar />
                <div className="newVenueContainer">
                    <form
                        className="createVenueForm"
                        encType="multipart/form-data"
                        onSubmit={createVenueSubmitHandler}
                    >
                        <h1>Create Venue</h1>

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
                                onChange={createVenueImagesChange}
                                multiple
                            />
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

export default CreateVenue;