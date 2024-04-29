//Todo ------------------------------------------------------------------------------ < Table: machine >
const select_lightIntensity = `Select * from "lightIntensity"`
const select_temperature = `Select * from "temperature"`
const select_humidity = `Select * from "humidity"`
const select_soilTemperature = `Select * from "soilTemperature"`
const select_soilMoisture = `Select * from "soilMoisture"`
const select_soilPH = `Select * from "soilPH"`
const select_waterFlow = `Select * from "waterFlow"`
const select_voltageFlow = `Select * from "voltageFlow"`
const select_currentFlow = `Select * from "currentFlow"`

const newRecord_lightIntensity = `insert into "lightIntensity" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_temperature = `insert into "temperature" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_humidity = `insert into "humidity" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_soilTemperature = `insert into "soilTemperature" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_soilMoisture = `insert into "soilMoisture" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_soilPH = `insert into "soilPH" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_waterFlow = `insert into "waterFlow" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_voltageFlow = `insert into "voltageFlow" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const newRecord_currentFlow = `insert into "currentFlow" (date, time, value_raw, value_con) values($1, $2, $3, $4)`



module.exports = {
    select_lightIntensity,
    select_temperature,
    select_humidity,
    select_soilTemperature,
    select_soilMoisture,
    select_soilPH,
    select_waterFlow,
    select_voltageFlow,
    select_currentFlow,

    newRecord_lightIntensity,
    newRecord_temperature,
    newRecord_humidity,
    newRecord_soilTemperature,
    newRecord_soilMoisture,
    newRecord_soilPH,
    newRecord_waterFlow,
    newRecord_voltageFlow,
    newRecord_currentFlow

}