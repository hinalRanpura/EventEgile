const express = require("express");
const { newEvent, getSingleEvent, myEvents, getAllEvents, venueEvents, updateEvent, deleteEvent } = require("../controller/eventController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Routes
router.route("/event/new").post(isAuthenticatedUser,newEvent);
router.route("/event/:id").get(isAuthenticatedUser ,getSingleEvent);
router.route("/my/event").get(isAuthenticatedUser ,myEvents);
router.route("/events").get(isAuthenticatedUser, authorizeRoles("admin") ,getAllEvents);
router.route("/my/event/manager").get(isAuthenticatedUser, authorizeRoles("manager") ,venueEvents);
router.route("/event/update/:id").put(isAuthenticatedUser, authorizeRoles("manager","admin"), updateEvent);
router.route("/event/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEvent);


module.exports = router;