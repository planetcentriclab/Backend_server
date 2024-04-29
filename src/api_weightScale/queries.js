//* ======== MILD requirement >
//Todo ------------------------------------------------------------------------------ < Table: profile_of_waste >
const selectAll_profile_of_waste_thai = `Select waste_profile_thai from "profile_of_waste"`
const selectAll_faculty = `Select Distinct faculty from "machine"`


//* ======== TONPLAM requirement >


//* ======== < DEFAULT >
//Todo ------------------------------------------------------------------------------ < Table: machine >
const selectAll_machine = `Select create_date, faculty, machine_name, all_profile from "machine" Order By create_date Desc, create_time Desc, machine_name Desc`
const checkMachine_nameExists = `Select s from "machine" s where s.machine_name = $1`
const newMachine = `insert into "machine" (create_date, faculty, machine_name, all_profile, create_time) values($1, $2, $3, $4, $5)`
const editMachine = `Update "machine" Set machine_name = $1, faculty = $2, all_profile = $3 Where machine_name = $1`
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
const selectFor_summary = `Select * from "record" Where create_date >= $3 And create_date <= $4 And faculty = $2 And waste_profile = ANY($1) Order by create_date ASC`
/* 
    SELECT * FROM public.record
    Where create_date >= '2024-03-28' 
        And create_date <= '2024-04-01' 
        And faculty = 'สถาบันวิทยาการหุ่นยนต์ภาคสนาม' 
        And waste_profile = Any(array['กระป๋อง', 'ขวดพลาสติก']) 
    Order by create_date Desc
*/
const oldDayRecord = `Select create_date from "record" Order By create_date ASC Limit 1`

module.exports = {
    //* ======== < MILD requirement >
        //Todo ----- < Table: profile_of_waste >
            selectAll_profile_of_waste_thai,
            selectAll_faculty,


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
}