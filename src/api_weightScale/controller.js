const pool = require('../../db/db_weightScale')
const querise = require('./queries')

//* < MILD requirement >
const selectAll_profile_of_waste_thai = (req, res) => {
    pool.query(querise.selectAll_profile_of_waste_thai , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const selectAll_faculty = (req, res) => {
    pool.query(querise.selectAll_faculty , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

//Todo ------------------------------------------------------------------------------ < Table: machine >
const selectAll_machine = (req, res) => {
    pool.query(querise.selectAll_machine , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

const selectAll_machine_forDashboard = (req, res) => {
    pool.query(querise.selectAll_machine , (error, result) => {
        if (error) throw error;
        
        const data = result.rows

        // ToDo: -----change date form
        function convertToThaiDate(normalDate) {
            const date = new Date(normalDate);
            const thaiYear = date.getFullYear() + 543;
            const thaiMonth = (date.getMonth() + 1).toString().padStart(2, '0');
            const thaiDay = date.getDate().toString().padStart(2, '0');
            return `${thaiDay}/${thaiMonth}/${thaiYear.toString().slice(2)}`;
        }
        const modifiedDate = data.map(item => {
            return { ...item, create_date: convertToThaiDate(item.create_date) };
        });
        
        // ToDo: -----change date form
        const modifiedAllProfile = modifiedDate.map(item => {
            item.all_profile = item.all_profile.join(', ');
            return item;
        });

        // console.log(modifiedAllProfile)
        res.status(200).json(modifiedAllProfile)
    })
}

const newMachine = (req, res) => {
    const {faculty, machine_name, all_profile} = req.body
    const create_date = new Date().toISOString().slice(0, 10)
    const create_time = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Bangkok', hour12: false})

    //*------------ < check if Machine_name exists >
    pool.query(querise.checkMachine_nameExists, [machine_name], (error, result) => {
        if(result.rows.length){
            // res.send("This Machine_name already exists ~! can't POSE")
            res.send("มีเครื่องชื่อนี้อยู่แล้ว เพิ่มไม่ได้!!")
        }
        else{
            //*------------ < add new machine  >
            pool.query(querise.newMachine, [create_date, faculty, machine_name, all_profile, create_time], (error, result) => {
                if (error) throw error;
                // res.status(201).send("Adding new machine successfully.!")
                res.status(201).send("เพิ่มละๆ")
            })
        }
    })
}

const editMachine = (req, res) => {
    const {machine_name, faculty, all_profile} = req.body
    console.log(req.body)
    //*------------ < check if Machine_name exists >
    pool.query(querise.checkMachine_nameExists, [machine_name], (error, result) => {
        if(result.rows.length){
            //*------------ < add new machine  >
            pool.query(querise.editMachine, [machine_name, faculty, all_profile], (error, result) => {
                if (error) throw error;
                res.status(201).send("Edited machine successfully.!")
            })
        }
        else{
            res.send("This Machine_name not found~!")
        }
    })
}

const deleteMachine = (req, res) => {
    const {machine_name} = req.body
    console.log(req.body)

    //*------------ < check if Machine_name exists >
    pool.query(querise.checkMachine_nameExists, [machine_name], (error, result) => {
        if(result.rows.length){
            //*------------ < add new machine  >
            pool.query(querise.deleteMachine, [machine_name], (error, result) => {
                if (error) throw error;
                // res.status(201).send("Deleted machine successfully.!")
                res.status(200).send("พบเครื่องชื่อนี้ ลบให้ละ")
            })
        }
        else{
            // res.send("This Machine_name not found~!")
            res.send("ไม่พบเครื่องชื่อนี้เลย")
        }
    })
}


//Todo ------------------------------------------------------------------------------ < Table: profile_of_waste >
const selectAll_profile_of_waste = (req, res) => {
    pool.query(querise.selectAll_profile_of_waste , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

const newWaste = (req, res) => {
    const {waste_profile} = req.body
    // console.log([waste_profile])
    //*------------ < check if waste_profile exists >
    pool.query(querise.checkWaste_profileExists, [waste_profile], (error, result) => {
        if(result.rows.length){
            res.send("This Waste_profile already exists ~! can't POSE")
        }
        else{
            //*------------ < add new waste_profile  >
            pool.query(querise.newWaste, [waste_profile], (error, result) => {
                if (error) throw error;
                res.status(201).send("Adding new user successfully.!")
            })
        }
    })
}

//Todo ------------------------------------------------------------------------------ < Table: record >
const selectAll_record = (req, res) => {
    pool.query(querise.selectAll_record , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

const summary = (req, res) => {
    const {profile_waste, faculty, start_date, end_date} = req.body
    // console.log(req.body)

    pool.query(querise.selectFor_summary, [profile_waste, faculty, start_date, end_date], (error, result) =>{
        if (error) throw error;
        // console.log(result.rows);

        function calculateWasteAmount(data){
            const wasteMap = {}
            const carbonFactor = {
                'กระป๋อง': 2,
                'ถุงวิบวับ': 2,
                'เศษอาหาร': 2,
                'แก้ว': 2,
                'ขยะอันตราย': 2,
                'กล่องนม': 2,
                'ขยะทั่วไป': 2,
                'ขยะกำพร้า': 2,
                'กระดาษ': 2,
                'ถุงพลาสติก': 2,
                'ขวดพลาสติก': 2,
                'กล่องอาหารพลาสติก': 2,
                'แก้วน้ำพลาสติก(ขายไม่ได้)': 2,
                'แก้วน้ำพลาสติก(ขายได้)': 2,
                'ช้อนส้อมพลาสติก': 2,
                'หลอดพลาสติก': 2,
                'ขยะห้องน้ำ': 2
            }

            let total_waste_detail;
            let total_carbon_detail;
            let amount_waste_detail;
            let amount_carbon_detail;
            let first_create_date;

            if(Array.isArray(data) && data.length === 0){
                total_waste_detail = 0
                total_carbon_detail = 0
                amount_waste_detail = 0
                amount_carbon_detail = 0
                first_create_date = 0   
            }
            else{
                data.forEach(item => {
                    const profile = item.waste_profile;
                    const weight = parseFloat(item.weight);
                    if (wasteMap[profile]) {
                        wasteMap[profile] += weight;
                    } 
                    else {
                        wasteMap[profile] = weight;
                    }
                });
    
                amount_waste_detail = Object.keys(wasteMap).map(profile => {
                    return {
                        profile: profile,
                        amount: wasteMap[profile]
                    };
                });
    
                amount_carbon_detail = Object.keys(wasteMap).map(profile => {
                    const amount = wasteMap[profile];
                    const factor = carbonFactor[profile];
                    return {
                        profile: profile,
                        amount: amount * factor
                    };
                });
    
                total_waste_detail = amount_waste_detail.reduce((total, item) => total + item.amount, 0)
    
                total_carbon_detail = amount_carbon_detail.reduce((total, item) => total + item.amount, 0)

                first_create_date = data[0].create_date
            }

            return {total_waste_detail, total_carbon_detail, amount_waste_detail, amount_carbon_detail, first_create_date}
        }

        const jsonData = calculateWasteAmount(result.rows)
        // console.log(jsonData)
        res.status(200).json(jsonData)
    })
}

const newRecord = (req, res) => {
    const {faculty, machine_name, waste_profile, weight} = req.body
    const create_date = new Date().toISOString().slice(0, 10)
    const create_time = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Bangkok', hour12: false})

    const UUID = crypto.randomUUID()
    pool.query(querise.newRecord, [UUID, create_date, faculty, machine_name, waste_profile, weight, create_time], (error, result) => {
        if (error) throw error;
        res.status(201).send("Adding new record successfully.!")
    })
    // //*------------ < check if Record exists >
    // pool.query(querise.checkRecord_HistoryExists, [create_date, machine_name, waste_profile], (error, result) => {
    //     if(resuslt.rows.length){
    //         res.send("This Record_History already exists ~! can't POSE")
    //     }
    //     else{
    //         //*------------ < add new record  >
    //         const UUID = crypto.randomUUID()
    //         pool.query(querise.newRecord, [UUID, create_date, faculty, machine_name, waste_profile, weight], (error, result) => {
    //             if (error) throw error;
    //             res.status(201).send("Adding new record successfully.!")
    //         })
    //     }
    // })
}

const oldDayRecord = (req, res) => {
    pool.query(querise.oldDayRecord , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}


module.exports = {
    //* ======== < MILD requirement >
        //Todo ----- < Table: profile_of_waste >
            selectAll_profile_of_waste_thai,
            selectAll_faculty,

    //* ======== < TONPLAM requirement >


    //* ======== < DEFAULT >
        //Todo ----- < Table: machine >
            selectAll_machine,
            selectAll_machine_forDashboard,
            newMachine,
            editMachine,
            deleteMachine,

        //Todo ----- < Table: profile_of_waste >
            selectAll_profile_of_waste,
            newWaste,

        //Todo ----- < Table: record >
            selectAll_record,
            summary,
            newRecord,
            oldDayRecord,
    
}