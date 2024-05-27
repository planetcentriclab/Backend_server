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
const selectAll_carbonFactor = (req, res) => {
    pool.query(querise.selectAll_carbonFactor , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}
const editCarbonFactor = (req, res) => {
    // console.log(req.body)

    pool.query(querise.editCarbonFactor, [
        req.body[0].carbon_factor,
        req.body[1].carbon_factor,
        req.body[2].carbon_factor,
        req.body[3].carbon_factor,
        req.body[4].carbon_factor,
        req.body[5].carbon_factor,
        req.body[6].carbon_factor,
        req.body[7].carbon_factor,
        req.body[8].carbon_factor,
        req.body[9].carbon_factor,
        req.body[10].carbon_factor,
        req.body[11].carbon_factor,
        req.body[12].carbon_factor,
        req.body[13].carbon_factor,
        req.body[14].carbon_factor,
        req.body[15].carbon_factor,
        req.body[16].carbon_factor,
    ], (error, result) => {
        if (error) throw error;
        res.status(201).send(`Edited Carbon Factor of successfully.!`)
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
            return `${thaiDay}/${thaiMonth}/${thaiYear.toString().slice()}`;
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
    if (create_time.startsWith("24")) {
        create_time = create_time.replace(/^24/, "00");
    }

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
    const {machine_name, machine_name_new, faculty, all_profile} = req.body
    console.log(req.body)

    if(machine_name === machine_name_new){  //Todo: ========= don't change machine name
        // console.log("don't change");
        pool.query(querise.checkMachine_nameExists, [machine_name], (error, result) => {
            if(result.rows.length){ //Todo: ========= machine name already exist
                pool.query(querise.editMachine, [machine_name, machine_name_new, faculty, all_profile], (error, result) => {
                    if (error) throw error;
                    // res.status(201).send("Edited machine successfully.!")
                    res.status(201).send("พบเครื่องที่ต้องการ และแก้ไขข้อมูลต่างๆให้แล้ว")
                })
            }
            else{   //Todo: ========= machine name not found
                // res.send("This Machine_name not found~!")
                res.send("ไม่พบเครื่องที่ต้องการแก้ไขข้อมูล")
            }
        })
    }
    else{   //Todo: ========= change machine name
        // console.log("change");
        pool.query(querise.checkMachine_nameExists, [machine_name], (error, result) => {
            if(result.rows.length){ //Todo: ========= machine name already exist

                pool.query(querise.checkMachine_nameExists, [machine_name_new], (error, result) => {
                    if(result.rows.length){ //Todo: ========= new machine name is already exist
                        res.send("พบเครื่องที่มีชื่อซ้ำแล้ว ใช้ชื่อนี้ไม่ได้นะจ๊ะ")
                    }
                    else{
                        pool.query(querise.editMachine, [machine_name, machine_name_new, faculty, all_profile], (error, result) => {
                            if (error) throw error;
                            // res.status(201).send("Edited machine successfully.!")
                            res.status(201).send(`พบเครื่องที่ต้องการ และแก้ไขชื่อจาก ${machine_name} เป็น ${machine_name_new} กับข้อมูลต่างๆให้แล้ว :)`)
                        })
                    }
                })
            }
            else{   //Todo: ========= machine name not found
                // res.send("This Machine_name not found~!")
                res.send("ไม่พบเครื่องที่ต้องการเปลี่ยนชื่อและแก้ไขข้อมูล")
            }
        })
    }
}

const deleteMachine = (req, res) => {
    const {machine_name} = req.body
    // console.log(req.body)

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

    pool.query(querise.selectAll_carbonFactor , (error, result) => {
        if (error) throw error;
        // console.log(result.rows);

        const profile_of_waste = result.rows.map(item => {
            return { "waste_profile_thai": item.waste_profile_thai };
        })

        // console.log(profile_of_waste)

        const carbonFactors = {}
        result.rows.forEach(item => {
            carbonFactors[item.waste_profile_thai] = item.carbon_factor;
        })        

        pool.query(querise.selectFor_summary, [profile_waste, faculty, start_date, end_date], (error, result) =>{
            if (error) throw error;
            // console.log(result.rows);

            function calculateWasteAmount(data1, data2) {
                const wasteMap = {};
        
                data1.forEach(item => {
                    const profile = item.waste_profile;
                    const weight = parseFloat(item.weight);
                    if (wasteMap[profile]) {
                        wasteMap[profile] += weight;
                    } else {
                        wasteMap[profile] = weight;
                    }
                });
        
                const amount_waste_detail = data2.map(item => {
                    return { profile: item.waste_profile_thai, amount: parseFloat((wasteMap[item.waste_profile_thai] || 0).toFixed(2))};
                });
            
                const amount_carbon_detail = data2.map(item => {
                    const profile = item.waste_profile_thai;
                    const factor = carbonFactors[profile] || 1;
                    const amount = wasteMap[profile] || 0;
                    return { profile, amount: parseFloat((amount * factor).toFixed(2)) };
                });
                
                const total_waste_detail = parseFloat((amount_waste_detail.reduce((total, item) => total + item.amount, 0)).toFixed(2))

                const total_carbon_detail = parseFloat((amount_carbon_detail.reduce((total, item) => total + item.amount, 0)).toFixed(2))
        
                if(Array.isArray(data1) && data1.length === 0){
                    first_create_date = 0
                }
                else{
                    first_create_date = data1[0].create_date
                }
            
                return { total_waste_detail, total_carbon_detail, amount_waste_detail, amount_carbon_detail, first_create_date};
            }
            const jsonData = calculateWasteAmount(result.rows, profile_of_waste)
            // console.log(jsonData)
            res.status(200).json(jsonData)
        })
    })
}

const newRecord = (req, res) => {
    const {faculty, machine_name, waste_profile, weight} = req.body
    const create_date = new Date().toISOString().slice(0, 10)
    const create_time = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Bangkok', hour12: false})
    if (create_time.startsWith("24")) {
        create_time = create_time.replace(/^24/, "00");
    }

    const UUID = crypto.randomUUID()
    pool.query(querise.newRecord, [UUID, create_date, faculty, machine_name, waste_profile, weight, create_time], (error, result) => {
        if (error) throw error;
        res.status(201).send("Adding new record successfully.!")
    })
}

const oldDayRecord = (req, res) => {
    pool.query(querise.oldDayRecord , (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows)
    })
}

const generateCSV = (req, res) => {
    const {faculty, start_date, end_date} = req.body
    // const faculty = req.body.faculty
    // const startDate = req.body.start_date
    // const endDate = req.body.end_date

    // console.log(start_date)

    pool.query(querise.selectAll_profile_of_waste_thai , (error, result) => {
        if (error) throw error;
        
        const all_waste_profile = result.rows
        // console.log(all_waste_profile)

        pool.query(querise.selectFor_CSV, [faculty, start_date, end_date], (error, result) => {
            if (error) throw error;


            const generateAfterData = (start_date, end_date, recordHistory) => {
            
                const formatDateThai = (date) => {
                    const d = new Date(date);
                    const day = d.getDate().toString().padStart(2, '0');
                    const month = (d.getMonth() + 1).toString().padStart(2, '0');
                    const year = (d.getFullYear() + 543).toString();
                    return `${day}/${month}/${year}`;
                };
            
                const stripTime = (date) => {
                    const d = new Date(date);
                    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                };
            
                const afterData = {};
            
                const dateRange = [];
                let currentDate = stripTime(start_date);
                const endDate = stripTime(end_date);
            
                while (currentDate <= endDate) {
                    dateRange.push(formatDateThai(currentDate));
                    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                }
            
                dateRange.forEach(date => {
                    afterData[date] = all_waste_profile.map(item => ({ profile: item.waste_profile_thai, amount: 0 }));
                });
            
                recordHistory.forEach(item => {
                    const createDate = stripTime(item.create_date);
                    const key = formatDateThai(createDate);
                    if (afterData[key]) {
                        const wasteProfileIndex = afterData[key].findIndex(profile => profile.profile === item.waste_profile);
                        if (wasteProfileIndex !== -1) {
                            afterData[key][wasteProfileIndex].amount += parseFloat(item.weight);
                        }
                    }
                });

                // Round the amounts to 2 decimal places
                Object.keys(afterData).forEach(date => {
                    afterData[date].forEach(item => {
                        item.amount = parseFloat(item.amount.toFixed(2));
                    });
                });                
            
                return afterData;
            };

            res.status(200).json(generateAfterData(start_date, end_date, result.rows))
        })
    })
}


module.exports = {
    //* ======== < MILD requirement >
        //Todo ----- < Table: profile_of_waste >
            selectAll_profile_of_waste_thai, 
            selectAll_faculty,
            selectAll_carbonFactor,
            editCarbonFactor,
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
            generateCSV,
    
}