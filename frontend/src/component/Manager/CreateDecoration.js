import React, { Fragment, useState, useEffect } from "react";
import "./ManagerDashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import ManagerSidebar from "./ManagerSidebar"
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CategoryIcon from "@material-ui/icons/Category";
import { clearErrors, createDecoration } from "../../actions/decorationAction";

const CreateDecoration = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newDecoration);

    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [decoType, setDecoType] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Decoration Plan Created Successfully");
            history.push("/manager/dashboard");
        }
    }, [dispatch, alert, error, history, success]);

    const createVenueSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("type", decoType);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createDecoration(myForm));
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
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Create Decoration Plan"} />

                    <div className="dashboard">
                        <ManagerSidebar />
                        <div className="newVenueContainer">
                            <form
                                className="createVenueForm"
                                encType="multipart/form-data"
                                onSubmit={createVenueSubmitHandler}
                            >
                                <h1>Create Decoration Plan</h1>

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
                                        <option value="natural_flowers">Natural Flowers</option>
                                        <option value="artificial_flowers">Artificial Flowers</option>
                                        <option value="ballons">Ballons</option>
                                        <option value="lights">Lights</option>
                                        <option value="backdrops">Backdrops</option>
                                        <option value="hanging_decor">Hanging decor</option>
                                        <option value="aisle_runners">Aisle runners</option>
                                        <option value="photo_props">Photo props</option>
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
                                        name="images"
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

                </Fragment>)}
        </Fragment>
    );
};

export default CreateDecoration;