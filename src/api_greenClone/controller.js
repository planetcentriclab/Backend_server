const pool = require('../../db/db_greenClone')
const querise = require('./queries')


const selectAll_sen1 = (req, res) => {
    pool.query(querise.selectAll_sen1 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const selectAll_sen2 = (req, res) => {
    pool.query(querise.selectAll_sen2 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const selectAll_sen3 = (req, res) => {
    pool.query(querise.selectAll_sen3 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const Record_sen1 = (req, res) => {
    const {value_raw, value_con} = req.body
    const create_date = new Date().toISOString().slice(0, 10)
    const create_Time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok', hour12: false })

    pool.query(querise.Record_sen1, [create_date, create_Time, value_raw, value_con], (error, result) => {
        if (error) throw error;
        res.status(201).send("Adding new record successfully.!")
    })
}
const Record_sen2 = (req, res) => {
    const {value_raw, value_con} = req.body
    const create_date = new Date().toISOString().slice(0, 10)
    const create_Time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok', hour12: false })

    pool.query(querise.Record_sen2, [create_date, create_Time, value_raw, value_con], (error, result) => {
        if (error) throw error;
        res.status(201).send("Adding new record successfully.!")
    })
}
const Record_sen3 = (req, res) => {
    const {value_raw, value_con} = req.body
    const create_date = new Date().toISOString().slice(0, 10)
    const create_Time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok', hour12: false })

    pool.query(querise.Record_sen3, [create_date, create_Time, value_raw, value_con], (error, result) => {
        if (error) throw error;
        res.status(201).send("Adding new record successfully.!")
    })
}

module.exports = {
    selectAll_sen1,
    selectAll_sen2,
    selectAll_sen3,

    Record_sen1,
    Record_sen2,
    Record_sen3
    
}