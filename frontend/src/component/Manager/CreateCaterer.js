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
import { clearErrors, createCaterer } from "../../actions/catererAction";

const CreateCaterer = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newCaterer);

    const [price, setPrice] = useState(1);
    const [description, setDescription] = useState("");
    const [food,setFood] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("FoodPlan Created Successfully");
            history.push("/manager/dashboard");
        }
    }, [dispatch, alert, error, history, success]);

    const createVenueSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("type", food);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        alert.success("Processing");
        dispatch(createCaterer(myForm));
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
                    <MetaData title={"Create Food Plan"} />

                    <div className="dashboard">
                        <ManagerSidebar />
                        <div className="newVenueContainer">
                            <form
                                className="createVenueForm"
                                encType="multipart/form-data"
                                onSubmit={createVenueSubmitHandler}
                            >
                                <h1>Create Caterer Plan</h1>

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

export default CreateCaterer;