const express = require("express");
const { getAllVenues, createVenue, updateVenue, deleteVenue, getVenueDetails, createVenueReview, getVenueReviews, getAdminVenues, getVenue } = require("../controller/venueController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/venues").get(getAllVenues);

router.route("/manager/venue").get(isAuthenticatedUser, authorizeRoles("manager"), getVenue);

router.route("/admin/venues").get(isAuthenticatedUser, authorizeRoles("admin"),getAdminVenues);

router.route("/venue/new").post(isAuthenticatedUser, authorizeRoles("manager"), createVenue);

router.route("/venue/:id")
        .put(isAuthenticatedUser, authorizeRoles("manager"), updateVenue)
        .delete(isAuthenticatedUser, authorizeRoles("manager","admin"), deleteVenue)


router.route("/venues/:id").get(getVenueDetails);

router.route("/review").put(isAuthenticatedUser, createVenueReview);

router.route("/reviews")  
        .get(getVenueReviews)

router.route("/review").put(isAuthenticatedUser , createVenueReview);

module.exports = router   