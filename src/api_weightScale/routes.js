const {Router} = require("express")
const controller = require("./controller")

const router = Router()

router.get("/", (req, res)=>{
    res.send("Using router Service > weightScale")
})

//Todo ------------------------------------------------------------------------------ < Table: machine >
router.get("/machine/faculty", controller.selectAll_faculty) //*
router.get("/machine/all", controller.selectAll_machine) //*
router.get("/machine/all/forDashboard", controller.selectAll_machine_forDashboard) //*
router.post("/machine/add", controller.newMachine) //*
router.put("/machine/edit", controller.editMachine) //!
router.delete("/machine/delete", controller.deleteMachine) //*

//Todo ------------------------------------------------------------------------------ < Table: profile_of_waste >
router.get("/profile_of_waste/all", controller.selectAll_profile_of_waste) //? optional
router.get("/profile_of_waste/thai", controller.selectAll_profile_of_waste_thai) //*
router.post("/profile_of_waste/add", controller.newWaste) //? optional

//Todo ------------------------------------------------------------------------------ < Table: record >
router.get("/record/all", controller.selectAll_record) //*
router.get("/record/summary", controller.summary) //!
router.post("/record/add", controller.newRecord) //*
router.get("/record/oldDayRecord", controller.oldDayRecord) //*


module.exports = router