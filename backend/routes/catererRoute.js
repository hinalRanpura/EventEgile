const express = require("express");
const { createCaterer, getCaterer, deleteCaterer, updateCaterer, getAllCaterer, getCatererDetail, getCatByManagerId } = require("../controller/catererController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/caterer/new").post(isAuthenticatedUser, authorizeRoles("manager"), createCaterer);
router.route("/caterers").get(isAuthenticatedUser, authorizeRoles("manager"), getCaterer);
router.route("/caterer/:id")
    .delete(isAuthenticatedUser, authorizeRoles("manager","admin"), deleteCaterer)
    .put(isAuthenticatedUser, authorizeRoles("manager"), updateCaterer)
    .get(isAuthenticatedUser, getCatererDetail)

    //.get(isAuthenticatedUser,authorizeRoles("manager","admin"), getCatererDetail)
router.route("/caterer").get(isAuthenticatedUser, getAllCaterer);

router.route("/cat/:id").get(getCatByManagerId);

module.exports = router;