const {Router} = require("express")
const controller = require("./controller")

const router = Router()

router.get("/", (req, res)=>{
    res.send("Using router Service > greenCone") 
})


//Todo ------------------------------------------------------------------------------ < Table: record >
router.get("/methane", controller.select_methane)
router.get("/moisture_0", controller.select_moisture_0)
router.get("/moisture_1", controller.select_moisture_1)
router.get("/ph", controller.select_ph)
router.get("/o2_0", controller.select_o2_0)
router.get("/o2_1", controller.select_o2_1)
router.get("/ambientLight", controller.select_ambientLight)
router.get("/co2_0", controller.select_co2_0)
router.get("/temp_noContact_0", controller.select_temp_noContact_0)
router.get("/co2_1", controller.select_co2_1)
router.get("/temp_noContact_1", controller.select_temp_noContact_1)
router.get("/temp_contact", controller.select_temp_contact)
router.get("/voltageFlow_in", controller.select_voltageFlow_in)
router.get("/currentFlow_in", controller.select_currentFlow_in)
router.get("/voltageFlow_out", controller.select_voltageFlow_out)
router.get("/currentFlow_out", controller.select_currentFlow_out)

router.post("/customSelect", controller.customSelect)

router.post("/add", controller.newRecord)  

module.exports = router