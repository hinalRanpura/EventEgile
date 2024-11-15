import { Fragment, useState, useEffect } from 'react';
import React from "react";
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Header from "./component/layout/Header/Header";
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home";
import AboutUs from "./component/layout/About"
import Contact from './component/layout/Contact';
import VenueDetails from "./component/Venue/VenueDetails"
import Success from "./component/Venue/Success"
import VenuePage from "./component/Venue/VenuePage";
import Search from './component/Venue/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import AdminDashboard from "./component/Admin/AdminDashboard"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions"
import { useSelector } from 'react-redux';
import store from "./store";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UsersList from './component/Admin/UserList';
import UpdateUser from "./component/Admin/UpdateUser";
import VenueList from './component/Admin/VenueList';
import ReviewList from './component/Admin/ReviewList';
import EventList from './component/Admin/EventList';
import ViewVenueAdmin from "./component/Admin/ViewVenueAdmin";
import CatererList from "./component/Admin/CatererList";
import ViewCatererAdmin from "./component/Admin/ViewCatererAdmin";
import DecorationList from "./component/Admin/DecorationList"
import ViewDecorationAdmin from "./component/Admin/ViewDecorationAdmin";
import ViewEventAdmin from "./component/Admin/ViewEventAdmin"
import ManagerDashboard from "./component/Manager/ManagerDashboard";
import Reviews from './component/Manager/Reviews';
import Events from './component/Manager/Events';
import CreateDecoration from "./component/Manager/CreateDecoration";
import CreateCaterer from "./component/Manager/CreateCaterer";
import CreateVenue from "./component/Manager/CreateVenue"
import Decoration from "./component/Manager/Decoration";
import Caterer from "./component/Manager/Caterer";
import Venue from "./component/Manager/Venues"
import ViewVenue from "./component/Manager/ViewVenue"
import UpdateVenue from "./component/Manager/UpdateVenue"
import ViewCaterer from "./component/Manager/ViewCaterer";
import UpdateCaterer from "./component/Manager/UpdateCaterer";
import ViewDecoration from './component/Manager/ViewDecoration';
import UpdateDecoration from "./component/Manager/UpdateDecoration";
import Cart from './component/Venue/Cart';
import Deco from "./component/Venue/Deco"
import ConfirmEvent from "./component/Venue/ConfirmEvent";
import Payment from "./component/Venue/Payment";
import MyEvents from "./component/Venue/MyEvents";
import EventDetails from "./component/Venue/EventDetails";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NotFound from "./component/layout/Not Found/NotFound";
import UpdateEvent from "./component/Manager/UpdateEvent";
import ViewEvent from "./component/Manager/ViewEvent";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/venue/:id" component={VenueDetails} />
        <Route exact path="/venues" component={VenuePage} />
        <Route path="/venues/:keyword" component={VenuePage} />        
        <Route path="/selectDeco" component={Deco} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/contactus" component={Contact} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/edit/profile" component={UpdateProfile} />
        <ProtectedRoute exact path="/changePassword" component={UpdatePassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/select/my" component={Cart} />
        <ProtectedRoute path="/confirmEvent" component={ConfirmEvent} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/events" component={MyEvents} />
        <ProtectedRoute exact path="/event/:id" component={EventDetails} />
        <ProtectedRoute isManager={true} exact path="/manager/dashboard" component={ManagerDashboard} />
        <ProtectedRoute isManager={true} exact path="/manager/reviews" component={Reviews} />
        <ProtectedRoute isManager={true} exact path="/manager/createVenue" component={CreateVenue} />
        <ProtectedRoute isManager={true} exact path="/manager/createCaterer" component={CreateCaterer} />
        <ProtectedRoute isManager={true} exact path="/manager/createDecoration" component={CreateDecoration} />
        <ProtectedRoute isManager={true} exact path="/manager/Venue" component={Venue} />
        <ProtectedRoute isManager={true} exact path="/manager/venue/view/:id" component={ViewVenue} />
        <ProtectedRoute isManager={true} exact path="/manager/venue/update/:id" component={UpdateVenue} />
        <ProtectedRoute isManager={true} exact path="/manager/Caterer" component={Caterer} />
        <ProtectedRoute isManager={true} exact path="/manager/caterer/view/:id" component={ViewCaterer} />
        <ProtectedRoute isManager={true} exact path="/manager/caterer/update/:id" component={UpdateCaterer} />
        <ProtectedRoute isManager={true} exact path="/manager/Decoration" component={Decoration} />
        <ProtectedRoute isManager={true} exact path="/manager/decoration/view/:id" component={ViewDecoration} />
        <ProtectedRoute isManager={true} exact path="/manager/decoration/update/:id" component={UpdateDecoration} />
        <ProtectedRoute isManager={true} exact path="/manager/events" component={Events} />
        <ProtectedRoute isManager={true} exact path="/manager/event/view/:id" component={ViewEvent} />
        <ProtectedRoute isManager={true} exact path="/manager/event/update/:id" component={UpdateEvent} />

        
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={AdminDashboard} />
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
        <ProtectedRoute isAdmin={true} exact path="/admin/venues" component={VenueList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/venue/:id" component={ViewVenueAdmin} />
        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ReviewList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/events" component={EventList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/event/:id" component={ViewEventAdmin} />
        <ProtectedRoute isAdmin={true} exact path="/admin/cateres" component={CatererList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/caterer/view/:id" component={ViewCatererAdmin} />
        <ProtectedRoute isAdmin={true} exact path="/admin/decorations" component={DecorationList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/decoration/view/:id" component={ViewDecorationAdmin} />
        
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
