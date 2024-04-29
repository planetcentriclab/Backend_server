const selectAll_sen1 = `Select * from "sen1"`
const selectAll_sen2 = `Select * from "sen2"`
const selectAll_sen3 = `Select * from "sen3"`

const checkRecord_sen1 = `Select s from "sen1" s where s.date = $1 and s.time = $2`
const checkRecord_sen2 = `Select s from "sen2" s where s.date = $1 and s.time = $2`
const checkRecord_sen3 = `Select s from "sen3" s where s.date = $1 and s.time = $2`

const Record_sen1 = `insert into "sen1" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const Record_sen2 = `insert into "sen2" (date, time, value_raw, value_con) values($1, $2, $3, $4)`
const Record_sen3 = `insert into "sen3" (date, time, value_raw, value_con) values($1, $2, $3, $4)`

module.exports = {
    //Todo ----- < Table: select by sensor id >
    selectAll_sen1,
    selectAll_sen2,
    selectAll_sen3,

    //Todo ----- < Table: checkrecord by sensor id >
    checkRecord_sen1,
    checkRecord_sen2,
    checkRecord_sen3,

    //Todo ----- < Table: record by sensor id >
    Record_sen1,
    Record_sen2,
    Record_sen3
    
}