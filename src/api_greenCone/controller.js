const pool = require('../../db/db_greenCone')
const querise = require('./queries')

//Todo ------------------------------------------------------------------------------ < select >
const select_methane = (req, res) => {
    pool.query(querise.select_methane , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows) 
    })
}
const select_moisture_0 = (req, res) => {
    pool.query(querise.select_moisture_0 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_moisture_1 = (req, res) => {
    pool.query(querise.select_moisture_1 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_ph = (req, res) => {
    pool.query(querise.select_ph , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_o2_0 = (req, res) => {
    pool.query(querise.select_o2_0 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_o2_1 = (req, res) => {
    pool.query(querise.select_o2_1 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_ambientLight = (req, res) => {
    pool.query(querise.select_ambientLight , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_co2_0 = (req, res) => {
    pool.query(querise.select_co2_0 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_temp_noContact_0 = (req, res) => {
    pool.query(querise.select_temp_noContact_0 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_co2_1 = (req, res) => {
    pool.query(querise.select_co2_1 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_temp_noContact_1 = (req, res) => {
    pool.query(querise.select_temp_noContact_1 , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_temp_contact = (req, res) => {
    pool.query(querise.select_temp_contact , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_voltageFlow_in = (req, res) => {
    pool.query(querise.select_voltageFlow_in , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_currentFlow_in = (req, res) => {
    pool.query(querise.select_currentFlow_in , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_voltageFlow_out = (req, res) => {
    pool.query(querise.select_voltageFlow_out , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const select_currentFlow_out = (req, res) => {
    pool.query(querise.select_currentFlow_out , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

//Todo ------------------------------------------------------------------------------ < select sensor and scope date >
const customSelect = (req, res) => {
    const {sensor, start_date, end_date} = req.body
    console.log(req.body)

    pool.query( 
    `
        Select * from "${sensor}"
        Where 
        date >= '${start_date}' and date <= '${end_date}'
        ORDER BY date ASC, "time" ASC 
    `, 
    (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}


//Todo ------------------------------------------------------------------------------ < record >
const newRecord = (req, res) => {
    const {
        methane, 
        moisture_0, 
        moisture_1, 
        ph, 
        o2_0,
        o2_1,
        ambientLight,
        co2_0,
        temp_noContact_0,
        co2_1,
        temp_noContact_1,
        temp_contact,
        voltageFlow_in,
        currentFlow_in,
        voltageFlow_out,
        currentFlow_out
    } = req.body

    console.log(req.body)

    const current_date = new Date().toLocaleDateString('en-CA', {timeZone: 'Asia/Bangkok'}).slice(0, 10)
    const current_time = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Bangkok', hour12: false})
    if (current_time.startsWith("24")) {
        current_time = current_time.replace(/^24/, "00"); 
    }

    pool.query(querise.newRecord_methane, [create_date, create_time, methane.data_0, methane.data_1])
    pool.query(querise.newRecord_moisture_0, [create_date, create_time, moisture_0.data_0, moisture_0.data_1])
    pool.query(querise.newRecord_moisture_1, [create_date, create_time, moisture_1.data_0, moisture_1.data_1])
    pool.query(querise.newRecord_ph, [create_date, create_time, ph.data_0])
    pool.query(querise.newRecord_o2_0, [create_date, create_time, o2_0.data_0])
    pool.query(querise.newRecord_o2_1, [create_date, create_time, o2_1.data_0])
    pool.query(querise.newRecord_ambientLight, [create_date, create_time, ambientLight.data_0])
    pool.query(querise.newRecord_co2_0, [create_date, create_time, co2_0.data_0])
    pool.query(querise.newRecord_temp_noContact_0, [create_date, create_time, temp_noContact_0.data_0])
    pool.query(querise.newRecord_co2_1, [create_date, create_time, co2_1.data_0])
    pool.query(querise.newRecord_temp_noContact_1, [create_date, create_time, temp_noContact_1.data_0])
    pool.query(querise.newRecord_temp_contact, [create_date, create_time, temp_contact.data_0])

    pool.query(querise.newRecord_voltageFlow_in, [create_date, create_time, voltageFlow_in.data_0])
    pool.query(querise.newRecord_currentFlow_in, [create_date, create_time, currentFlow_in.data_0])
    pool.query(querise.newRecord_voltageFlow_out, [create_date, create_time, voltageFlow_out.data_0])
    pool.query(querise.newRecord_currentFlow_out, [create_date, create_time, currentFlow_out.data_0])

    res.send('Adding new record successfully.!');
}

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

    customSelect,

    newRecord
}