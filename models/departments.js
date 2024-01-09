import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    }
})

export const Department = mongoose.model("Department", departmentSchema)