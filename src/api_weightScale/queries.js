//* ======== MILD requirement >
//Todo ------------------------------------------------------------------------------ < Table: profile_of_waste >
const selectAll_profile_of_waste_thai = `Select waste_profile_thai from "profile_of_waste" ORDER BY waste_profile ASC `
const selectAll_faculty = `Select Distinct faculty from "machine"`
const selectAll_carbonFactor = `Select waste_profile_thai, carbon_factor from "profile_of_waste" ORDER BY waste_profile ASC `
const editCarbonFactor = `
    UPDATE "profile_of_waste"
    SET carbon_factor = 
        CASE 
            WHEN waste_profile_thai = 'กระป๋อง' THEN $1 ::numeric
            WHEN waste_profile_thai = 'ถุงวิบวับ' THEN $2 ::numeric
            WHEN waste_profile_thai = 'เศษอาหาร' THEN $3 ::numeric
            WHEN waste_profile_thai = 'แก้ว' THEN $4 ::numeric
            WHEN waste_profile_thai = 'ขยะอันตราย' THEN $5 ::numeric
            WHEN waste_profile_thai = 'กล่องนม' THEN $6 ::numeric
            WHEN waste_profile_thai = 'ขยะทั่วไป' THEN $7 ::numeric
            WHEN waste_profile_thai = 'ขยะกำพร้า' THEN $8 ::numeric
            WHEN waste_profile_thai = 'กระดาษ' THEN $9 ::numeric
            WHEN waste_profile_thai = 'ถุงพลาสติก' THEN $10 ::numeric
            WHEN waste_profile_thai = 'ขวดพลาสติก' THEN $11 ::numeric
            WHEN waste_profile_thai = 'กล่องอาหารพลาสติก' THEN $12 ::numeric
            WHEN waste_profile_thai = 'แก้วน้ำพลาสติก(ขายไม่ได้)' THEN $13 ::numeric
            WHEN waste_profile_thai = 'แก้วน้ำพลาสติก(ขายได้)' THEN $14 ::numeric
            WHEN waste_profile_thai = 'ช้อนส้อมพลาสติก' THEN $15 ::numeric
            WHEN waste_profile_thai = 'หลอดพลาสติก' THEN $16 ::numeric
            WHEN waste_profile_thai = 'ขยะห้องน้ำ' THEN $17 ::numeric
        END;
`

//* ======== TONPLAM requirement >editCarbonFactor


//* ======== < DEFAULT >
//Todo ------------------------------------------------------------------------------ < Table: machine >
const selectAll_machine = `Select create_date, faculty, machine_name, all_profile from "machine" Order By create_date Desc, create_time Desc, machine_name Desc`
const checkMachine_nameExists = `Select s from "machine" s where s.machine_name = $1`
const newMachine = `insert into "machine" (create_date, faculty, machine_name, all_profile, create_time) values($1, $2, $3, $4, $5)`
const editMachine = `Update "machine" Set machine_name = $2, faculty = $3, all_profile = $4 Where machine_name = $1`
const deleteMachine = `Delete From "machine" Where machine_name = $1`

//Todo ------------------------------------------------------------------------------ < Table: profile_of_waste >
const selectAll_profile_of_waste = `Select * from "profile_of_waste"`
const checkWaste_profileExists = `Select s from "profile_of_waste" s where s.waste_profile = $1`
const newWaste = `insert into "profile_of_waste" (waste_profile) values($1)` 

//Todo ------------------------------------------------------------------------------ < Table: record >
const selectAll_record = `Select * from "record"` 
// Select create_date, faculty, machine_name, waste_profile, weight
// from public.record
// Order By create_date Desc, create_time Desc, machine_name Desc

const checkRecord_HistoryExists = `Select s from "record" s where s.create_date = $1 and s.machine_name = $2 and s.waste_profile = $3`
const newRecord = `insert into "record" (unique_id, create_date, faculty, machine_name, waste_profile, weight, create_time) values($1, $2, $3, $4, $5, $6, $7)`
const selectFor_summary = `Select create_date, waste_profile, weight from "record" Where create_date >= $3 And create_date <= $4 And faculty = ANY($2) And waste_profile = ANY($1) Order by create_date Asc, create_time Asc`
/* 
    SELECT create_date, waste_profile, weight FROM public.record
    Where create_date >= '2024-03-28' 
        And create_date <= '2024-04-20' 
        And faculty = Any(array['สถาบันวิทยาการหุ่นยนต์ภาคสนาม', 'คณะวิศวกรรมศาสตร์'])
        And waste_profile = Any(array['กระป๋อง', 'ขวดพลาสติก']) 
    Order by create_date Asc, create_time Asc
*/
const oldDayRecord = `Select create_date from "record" Order By create_date ASC Limit 1`
const selectFor_CSV = `Select create_date, waste_profile, weight from "record" Where create_date >= $2 And create_date <= $3 And faculty = ANY($1) Order by create_date Asc, create_time Asc`


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
            checkMachine_nameExists,
            newMachine,
            editMachine,
            deleteMachine,

        //Todo ----- < Table: profile_of_waste >
            selectAll_profile_of_waste,
            checkWaste_profileExists,
            newWaste,

        //Todo ----- < Table: record >
            selectAll_record,
            checkRecord_HistoryExists,
            newRecord,
            selectFor_summary,
            oldDayRecord,
            selectFor_CSV,
}