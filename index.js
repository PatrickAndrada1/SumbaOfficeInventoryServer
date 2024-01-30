import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import { PORT, mongoURL } from "./config.js";
import User from "./models/user.js";
import Department from "./models/departments.js";
import Inventory from "./models/inventory.js";

const app = express();
const upload = multer({ dest: "uploads/" }); // Destination folder for uploaded files
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Sumba Inventory Office Server");
});

// create a user

app.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get users

app.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create a Department

app.post("/addDepartment", async (req, res) => {
  try {
    const department = req.body;
    const newDepartment = await Department.create(department);
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get Deparmtments

app.get("/departments", async (req, res) => {
  try {
    const data = await Department.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/addInventory", upload.single("picture"), async (req, res) => {
  try {
    // Assuming you are storing the file path in the database
    const inventory = {
      name: req.body.name,
      specs: req.body.specs,
      category: req.body.category,
      dateOfPurchase: req.body.dateOfPurchase,
      price: req.body.price,
      condition: req.body.condition,
      notes: req.body.notes,
      department_id: req.body.department_id,
      picture: req.file.path, // Save the path to the uploaded file
    };

    const newInventory = await Inventory.create(inventory);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get Inventories

app.get("/inventories", async (req, res) => {
  try {
    const data = await Inventory.find({})
      .populate({ path: "departments", options: { strictPopulate: false } })
      .exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// connect to DB

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App is connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
