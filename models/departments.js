import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model.Departments || mongoose.model('Department', DepartmentSchema)
