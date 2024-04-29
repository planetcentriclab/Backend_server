const {Router} = require("express")
const controller = require("./controller")

const router = Router()

router.get("/", (req, res)=>{
    res.send("Using router Service > greenClone")
})


//Todo ------------------------------------------------------------------------------ < Table: record >
router.get("/sen1/all", controller.selectAll_sen1)
router.get("/sen2/all", controller.selectAll_sen2)
router.get("/sen3/all", controller.selectAll_sen3)

router.post("/sen1/add", controller.Record_sen1)
router.post("/sen2/add", controller.Record_sen2)
router.post("/sen3/add", controller.Record_sen3)



module.exports = router