const pool = require('../../db/db_verticalForest')
const querise = require('./queries')

//Todo ------------------------------------------------------------------------------ < select >
const select_lightIntensity = (req, res) => {
    pool.query(querise.select_lightIntensity , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows) 
    })
}
const select_temperature = (req, res) => {
    pool.query(querise.select_temperature , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_humidity = (req, res) => {
    pool.query(querise.select_humidity , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_soilTemperature = (req, res) => {
    pool.query(querise.select_soilTemperature , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_soilMoisture = (req, res) => {
    pool.query(querise.select_soilMoisture , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_soilPH = (req, res) => {
    pool.query(querise.select_soilPH , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_waterFlow1 = (req, res) => {
    pool.query(querise.select_waterFlow1 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_waterFlow2 = (req, res) => {
    pool.query(querise.select_waterFlow2 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_voltageFlow = (req, res) => {
    pool.query(querise.select_voltageFlow , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_currentFlow = (req, res) => {
    pool.query(querise.select_currentFlow , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

//Todo ------------------------------------------------------------------------------ < record >
const newRecord = (req, res) => {
    const {
        lightIntensity, 
        temperature, 
        humidity, 
        soilTemperature, 
        soilMoisture,
        soilPH,
        waterFlow1,
        waterFlow2,
        voltageFlow,
        currentFlow
    } = req.body

    const create_date = new Date().toISOString().slice(0, 10)
    const create_time = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Bangkok', hour12: false})
    if (create_time.startsWith("24")) {
        create_time = create_time.replace(/^24/, "00");
    }

    pool.query(querise.newRecord_lightIntensity, [create_date, create_time, lightIntensity.value_raw, lightIntensity.value_con])
    pool.query(querise.newRecord_temperature, [create_date, create_time, temperature.value_raw, temperature.value_con])
    pool.query(querise.newRecord_humidity, [create_date, create_time, humidity.value_raw, humidity.value_con])
    pool.query(querise.newRecord_soilTemperature, [create_date, create_time, soilTemperature.value_raw, soilTemperature.value_con])
    pool.query(querise.newRecord_soilMoisture, [create_date, create_time, soilMoisture.value_raw, soilMoisture.value_con])
    pool.query(querise.newRecord_soilPH, [create_date, create_time, soilPH.value_raw, soilPH.value_con])
    pool.query(querise.newRecord_waterFlow1, [create_date, create_time, waterFlow1.value_raw, waterFlow1.value_con])
    pool.query(querise.newRecord_waterFlow2, [create_date, create_time, waterFlow2.value_raw, waterFlow2.value_con])
    pool.query(querise.newRecord_voltageFlow, [create_date, create_time, voltageFlow.value_raw, voltageFlow.value_con])
    pool.query(querise.newRecord_currentFlow, [create_date, create_time, currentFlow.value_raw, currentFlow.value_con])

    res.send('Adding new record successfully.!');
}

module.exports = {
    select_lightIntensity,
    select_temperature,
    select_humidity,
    select_soilTemperature,
    select_soilMoisture,
    select_soilPH,
    select_waterFlow1,
    select_waterFlow2,
    select_voltageFlow,
    select_currentFlow,

    newRecord
}