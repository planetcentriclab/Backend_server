const {Router} = require("express")
const controller = require("./controller")

const router = Router()

router.get("/", (req, res)=>{
    res.send("Using router Service > verticalForest")
})

//Todo ------------------------------------------------------------------------------ < Table: record sen1 >
// router.get("/all", controller.selectAll_record)

router.get("/lightIntensity/", controller.select_lightIntensity)
router.get("/temperature", controller.select_temperature)
router.get("/humidity", controller.select_humidity)
router.get("/soilTemperature", controller.select_soilTemperature)
router.get("/soilMoisture", controller.select_soilMoisture)
router.get("/soilPH", controller.select_soilPH)
router.get("/waterFlow1", controller.select_waterFlow1)
router.get("/waterFlow2", controller.select_waterFlow2)
router.get("/voltageFlow", controller.select_voltageFlow)
router.get("/currentFlow", controller.select_currentFlow)

router.post("/add", controller.newRecord)


module.exports = router