const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");

const cors = require("cors");
app.use(cors());
mongoose.connect("mongodb+srv://naiduabhay1:naiduabhay1107@cluster0.llkl16k.mongodb.net/news");

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  status: String,
  date: String,
  fileUrl: String,
});

const NFeed = mongoose.model("NFeed", newsSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file);
    const path2="uploads/"+req.file.filename;
    const newsFeed = new NFeed({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      status: req.body.status,
      date: req.body.date,
      fileUrl: req.file ? path2 : null, // Store the file path if available
    });
    console.log(newsFeed);

    await newsFeed.save();

    res.status(201).send("News feed created successfully");
  } catch (error) {
    console.error("Error creating news feed:", error);
    res.status(500).send("Internal server error");
  }
});
app.get("/", upload.none(), async (req, res) => {
  try {
    const data = await NFeed.find({});
    
    res.send(data);
  } catch (error) {
    console.error("Error finding news feed:", error);
    res.status(500).send("Internal server error");
  }
});
app.delete("/",  async (req, res) => {
    try {
        const data=req.body;
        const received=await NFeed.deleteOne(data);
      
      
      res.send(received);
     
    } catch (error) {
      console.error("Error finding news feed:", error);
      res.status(500).send("Internal server error");
    }
  });

const PORT = process.env.PORT || 8000;
app.listen(process.env.PORT || 8000, () =>
  console.log("server is running....")
);
