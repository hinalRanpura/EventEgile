import React, { Fragment, useEffect, useState } from "react";
import "./CreateVenue.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateDecoration, getDecorationDetails } from "../../actions/decorationAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import CategoryIcon from "@material-ui/icons/Category";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import SideBar from "./ManagerSidebar";
import { Link } from "react-router-dom";
import { UPDATE_DECORATION_RESET } from "../../consants/decorationConstants";

const UpdateDecoration = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { decoration, error } = useSelector((state) => state.decorationDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.decoration);



    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [decoType, setDecoType] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);


    const decorationId = match.params.id;

    useEffect(() => {
        if (decoration && decoration._id !== decorationId) {
            dispatch(getDecorationDetails(decorationId));
        } else {
            setDescription(decoration.description);
            setPrice(decoration.price);
            setDecoType(decoration.food);
            setOldImages(decoration.images);
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
            alert.success("decoration Updated Successfully");
            history.push("/manager/Decoration");
            dispatch({ type: UPDATE_DECORATION_RESET });
        }
    }, [dispatch,
        alert,
        error,
        history,
        isUpdated,
        decorationId,
        decoration,
        updateError]);

    const updateDecorationSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("type", decoType);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        alert.success("Processing");

        dispatch(updateDecoration(decorationId, myForm));
    };

    const updateDecorationImagesChange = (e) => {
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
                        <Link to={`/manager/Decoration`}>
                            <ArrowBackIosSharpIcon />
                        </Link>
                    </div>
                    <form
                        className="createVenueForm"
                        encType="multipart/form-data"
                        onSubmit={updateDecorationSubmitHandler}
                    >
                        <h1>Update Decoration</h1>

                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}    
                                />
                        </div>
                        <div className="signUpRole">
                                    <CategoryIcon />
                                    <select 
                                    required
                                    onChange={(e) => setDecoType(e.target.value)}    
                                    name="decoType">
                                        <option>Select Category</option>
                                        <option value="Natural Flowers">Natural Flowers</option>
                                        <option value="Artificial Flowers">Artificial Flowers</option>
                                        <option value="Ballons">Ballons</option>
                                        <option value="Lights">Lights</option>
                                        <option value="Backdrops">Backdrops</option>
                                        <option value="Hanging decor">Hanging decor</option>
                                        <option value="Aisle runners">Aisle runners</option>
                                        <option value="Photo props">Photo props</option>
                                    </select>

                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div id="createVenueFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateDecorationImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createVenueFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Decoration Preview" />
                                ))}
                        </div>

                        <div id="createVenueFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Decoration Preview" />
                            ))}
                        </div>

                        <Button
                            id="createVenueBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            UPDATE
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateDecoration;