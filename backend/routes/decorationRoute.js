const express = require("express");
const { createDecoration, getDecoration, deleteDecoration, updateDecoration, getAllDecoration, getDecorationDetail, getDecorationByManagerId } = require("../controller/decorationController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/decoration/new").post(isAuthenticatedUser, authorizeRoles("manager"), createDecoration);
router.route("/decorations").get(isAuthenticatedUser, authorizeRoles("manager"), getDecoration);
router.route("/decoration/:id")
    .delete(isAuthenticatedUser, authorizeRoles("manager","admin"), deleteDecoration)
    .put(isAuthenticatedUser, authorizeRoles("manager"), updateDecoration)
    .get(isAuthenticatedUser, getDecorationDetail)

    //.get(isAuthenticatedUser,authorizeRoles("manager","admin"), getDecorationDetail)
router.route("/decoration").get(isAuthenticatedUser, getAllDecoration);
router.route("/deco/:id").get(getDecorationByManagerId);


module.exports = router;