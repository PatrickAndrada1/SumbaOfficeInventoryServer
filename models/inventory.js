import mongoose from "mongoose";

const InventorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    specs: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    dateOfPurchase: {
      type: Date,
    },
    price: {
      type: String,
      require: true,
    },
    condition: {
      type: String,
      require: true,
    },
    notes: {
      type: String,
    },
    department_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department", // Reference to the Department model
    }],
    picture: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.Inventories || mongoose.model('Inventory', InventorySchema)
