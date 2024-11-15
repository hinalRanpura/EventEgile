import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newReviewReducer, newVenueReducer, reviewReducer, venueDetailsReducer, venueReducer, venueReviewssReducer, venuesReducer } from "./reducers/venueReducers";
import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { catererDetailsReducer, catererReducer, caterersReducer, newCatererReducer } from "./reducers/catererReducer";
import { decorationDetailsReducer, decorationReducer, decorationsReducer, newDecorationReducer } from "./reducers/decorationReducer";
import { cartReducer, decoReducer, catReducer } from "./reducers/cartReducer";
import { eventDetailsReducer, myEventsReducer, newEventReducer, allEventsReducer, eventsReducer } from "./reducers/eventReducer";

const reducer = combineReducers({
    venues: venueReducer,
    venueDetails: venueDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    newEvent: newEventReducer,
    myEvents:myEventsReducer,
    eventDetails:eventDetailsReducer,
    allEvents: allEventsReducer,
    newVenue: newVenueReducer,
    venue: venuesReducer,
    newCaterer: newCatererReducer,
    caterers: catererReducer,
    caterer: caterersReducer,
    catererDetails: catererDetailsReducer,
    decorationDetails: decorationDetailsReducer,
    decoration: decorationsReducer,
    decorations: decorationReducer,
    newDecoration: newDecorationReducer,
    cart: cartReducer,
    deco: decoReducer,
    cat: catReducer,
    hello:eventsReducer,
    newReview:newReviewReducer,
    venueReviews:venueReviewssReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        timeInfo: localStorage.getItem("timeInfo")
            ? JSON.parse(localStorage.getItem("timeInfo"))
            : {},
    },
    deco: {
        decoItems: localStorage.getItem("decoItems")
            ? JSON.parse(localStorage.getItem("decoItems"))
            : [],
    },
    cat: {
        catItems: localStorage.getItem("catItems")
            ? JSON.parse(localStorage.getItem("catItems"))
            : [],
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;