import React, { Fragment, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Profile.css"
import MetaData from "../layout/MetaData";
import FacebookIcon from "@material-ui/icons/Facebook"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"
import TwitterIcon from "@material-ui/icons/Twitter"
import InstagramIcon from "@material-ui/icons/Instagram"
import EditIcon from "@material-ui/icons/Edit"
import EventAvailableIcon from "@material-ui/icons/Event"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
const Profile = ({history}) => {

    const {user,isAuthenticated,loading} = useSelector(state => state.user)

    useEffect(() => {
        if(isAuthenticated === "false"){
            history.push("/login");
        }
    },[history,isAuthenticated])

    return (
        <Fragment>
            {loading ? ( <Loader/>) : (
                <>
                <MetaData title={`${user.name}'s Profile`} />
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-xl-6 col-md-12">
                                <div className="card user-card-full">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-sm-4 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25">
                                                    <img src={user.avatar.url ? user.avatar.url : "https://img.icons8.com/bubbles/100/000000/user.png"} className="img-radius" alt="Profile" />
                                                </div>
                                                <h6 className="f-w-600">{user.name}</h6>
                                                <p>{user.role}</p>
                                                <Link to={"edit/profile"} className="link"><EditIcon/> Edit Profile</Link>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{user.email}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Phone</p>
                                                        <h6 className="text-muted f-w-400">{user.phone}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">JoinedOn</p>
                                                        <h6 className="text-muted f-w-400">{String(user.createdAt).substr(0,10)}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">My Events</p>
                                                        <Link to="events" className="link1"><EventAvailableIcon/> Event</Link>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Change Password</p>
                                                        <Link to="changePassword" className="link1"><EditIcon/> Password</Link>
                                                    </div>
                                                </div>
                                                <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                    <li><FacebookIcon /></li>
                                                    <li><WhatsAppIcon /></li>
                                                    <li><TwitterIcon /></li>
                                                    <li><InstagramIcon /></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </>
            )}
        </Fragment>
    );
}

export default Profile;
