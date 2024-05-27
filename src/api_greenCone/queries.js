//Todo ------------------------------------------------------------------------------ < Table: select >
const select_methane = `Select * from "methane"`
const select_moisture_0 = `Select * from "moisture_0"`
const select_moisture_1 = `Select * from "moisture_1"`
const select_ph = `Select * from "ph"`
const select_o2_0 = `Select * from "o2_0"`
const select_o2_1 = `Select * from "o2_1"`
const select_ambientLight = `Select * from "ambientLight"`  
const select_co2_0 = `Select * from "co2_0"`
const select_temp_noContact_0 = `Select * from "temp_noContact_0"`
const select_co2_1 = `Select * from "co2_1"`
const select_temp_noContact_1 = `Select * from "temp_noContact_1"`
const select_temp_contact = `Select * from "temp_contact"` 
const select_voltageFlow_in = `Select * from "voltageFlow_in"` 
const select_currentFlow_in = `Select * from "currentFlow_in"` 
const select_voltageFlow_out = `Select * from "voltageFlow_out"` 
const select_currentFlow_out = `Select * from "currentFlow_out"` 

//Todo ------------------------------------------------------------------------------ < Table: record >
const newRecord_methane = `insert into "methane" (date, time, data0, data1) values($1, $2, $3, $4)`
const newRecord_moisture_0 = `insert into "moisture_0" (date, time, data0, data1) values($1, $2, $3, $4)`
const newRecord_moisture_1 = `insert into "moisture_1" (date, time, data0, data1) values($1, $2, $3, $4)`
const newRecord_ph = `insert into "ph" (date, time, data0) values($1, $2, $3)`
const newRecord_o2_0 = `insert into "o2_0" (date, time, data0) values($1, $2, $3)`
const newRecord_o2_1 = `insert into "o2_1" (date, time, data0) values($1, $2, $3)`
const newRecord_ambientLight = `insert into "ambientLight" (date, time, data0) values($1, $2, $3)`
const newRecord_co2_0 = `insert into "co2_0" (date, time, data0) values($1, $2, $3)`
const newRecord_temp_noContact_0 = `insert into "temp_noContact_0" (date, time, data0) values($1, $2, $3)`
const newRecord_co2_1 = `insert into "co2_1" (date, time, data0) values($1, $2, $3)`
const newRecord_temp_noContact_1 = `insert into "temp_noContact_1" (date, time, data0) values($1, $2, $3)`
const newRecord_temp_contact = `insert into "temp_contact" (date, time, data0) values($1, $2, $3)`
const newRecord_voltageFlow_in = `insert into "voltageFlow_in" (date, time, data0) values($1, $2, $3)`
const newRecord_currentFlow_in = `insert into "currentFlow_in" (date, time, data0) values($1, $2, $3)`
const newRecord_voltageFlow_out = `insert into "voltageFlow_out" (date, time, data0) values($1, $2, $3)`
const newRecord_currentFlow_out = `insert into "currentFlow_out" (date, time, data0) values($1, $2, $3)`

module.exports = {
    select_methane,
    select_moisture_0,
    select_moisture_1,
    select_ph,
    select_o2_0,
    select_o2_1,
    select_ambientLight,
    select_co2_0,
    select_temp_noContact_0,
    select_co2_1,
    select_temp_noContact_1,
    select_temp_contact,
    select_voltageFlow_in,
    select_currentFlow_in,
    select_voltageFlow_out,
    select_currentFlow_out,

    newRecord_methane,
    newRecord_moisture_0,
    newRecord_moisture_1,
    newRecord_ph,
    newRecord_o2_0,
    newRecord_o2_1,
    newRecord_ambientLight,
    newRecord_co2_0,
    newRecord_temp_noContact_0,
    newRecord_co2_1,
    newRecord_temp_noContact_1,
    newRecord_temp_contact,
    newRecord_voltageFlow_in,
    newRecord_currentFlow_in,
    newRecord_voltageFlow_out,
    newRecord_currentFlow_out
}