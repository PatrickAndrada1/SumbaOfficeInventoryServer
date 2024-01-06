import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import multer from 'multer';
import path from 'path';
import { PORT, mongoURL } from './config.js'

const app = express();
app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to Sumba Inventory Office Server')
})

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Ensure 'uploads' directory exists and is writable
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).array('images', 5);

// app.post('/upload', (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading
//       console.log('Multer Error:', err);
//       return res.status(500).json(err);
//     } else if (err) {
//       // An unknown error occurred
//       console.log('Unknown Error:', err);
//       return res.status(500).json(err);
//     }
//     // Files were successfully uploaded
//     console.log('Files uploaded successfully:', req.files);
//     return res.status(200).send(req.files);
//   });
// });

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
