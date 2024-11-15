import React, { Fragment, useEffect, useState } from "react";
import "./CreateVenue.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateCaterer, getCatererDetails } from "../../actions/catererAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import CategoryIcon from "@material-ui/icons/Category";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import SideBar from "./ManagerSidebar";
import { Link } from "react-router-dom";
import { UPDATE_CATERER_RESET } from "../../consants/catererConstants";

const UpdateCaterer = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { caterer, error } = useSelector((state) => state.catererDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.caterer);



    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [food, setFood] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);


    const catererId = match.params.id;

    useEffect(() => {
        if (caterer && caterer._id !== catererId) {
            dispatch(getCatererDetails(catererId));
        } else {
            setDescription(caterer.description);
            setPrice(caterer.price);
            setFood(caterer.food);
            setOldImages(caterer.images);
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
            alert.success("Caterer Updated Successfully");
            history.push("/manager/Caterer");
            dispatch({ type: UPDATE_CATERER_RESET });
        }
    }, [dispatch,
        alert,
        error,
        history,
        isUpdated,
        catererId,
        caterer,
        updateError]);

    const updateCatererSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("type", food);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        alert.success("Processing");

        dispatch(updateCaterer(catererId, myForm));
    };

    const updateCatererImagesChange = (e) => {
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
                        <Link to={`/manager/Caterer`}>
                            <ArrowBackIosSharpIcon />
                        </Link>
                    </div>
                    <form
                        className="createVenueForm"
                        encType="multipart/form-data"
                        onSubmit={updateCatererSubmitHandler}
                    >
                        <h1>Update Caterer</h1>

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
                            <select required
                                name="food"
                                onChange={(e) => setFood(e.target.value)}
                                >
                                <option>Select Category</option>
                                <option value="punjabi">Punjabi</option>
                                <option value="gujarati">Gujarati</option>
                                <option value="southindian">South Indian</option>
                                <option value="chinese">Chinese</option>
                                <option value="italian">Italian</option>
                                <option value="korean">Korean</option>
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
                                onChange={updateCatererImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createVenueFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Caterer Preview" />
                                ))}
                        </div>

                        <div id="createVenueFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Caterer Preview" />
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

export default UpdateCaterer;