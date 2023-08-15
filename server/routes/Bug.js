const { Router } = require("express");
const express = require("express")
const router  = express.Router();

const {createBug,getAllBug,getBugById,updateById,deleteBug} = require("../controllers/Bug") ;

const {auth,isTester,isDeveloper} = require("../middlewares/auth");

router.post("/createBug",auth,isTester,createBug);
router.get("/getAllBug",getAllBug);
router.get("/getBugById/:id",getBugById);
router.post("/updateById",auth,updateById);
router.post("/deleteBug/:id",auth,deleteBug);


module.exports = router