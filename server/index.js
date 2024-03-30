const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");

const cors = require("cors");
app.use(cors());
mongoose.connect("mongodb+srv://naiduabhay1:naiduabhay1107@cluster0.llkl16k.mongodb.net/news");

// Define mongoose schema for news feed
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  status: String,
  date: String,
  fileUrl: String,
});

// Create mongoose model
const NFeed = mongoose.model("NFeed", newsSchema);

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route for creating a new news feed
app.post("/", upload.single("file"), async (req, res) => {
  try {
    // Construct file path
    const filePath = "uploads/" + req.file.filename;

    // Create new news feed instance
    const newsFeed = new NFeed({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      status: req.body.status,
      date: req.body.date,
      fileUrl: req.file ? filePath : null, // Store the file path if available
    });

    // Save the news feed to database
    await newsFeed.save();

    res.status(201).send("News feed created successfully");
  } catch (error) {
    console.error("Error creating news feed:", error);
    res.status(500).send("Internal server error");
  }
});

// GET route for fetching all news feeds
app.get("/", async (req, res) => {
  try {
    const data = await NFeed.find({});
    res.send(data);
  } catch (error) {
    console.error("Error finding news feed:", error);
    res.status(500).send("Internal server error");
  }
});

// DELETE route for deleting a news feed
app.delete("/", async (req, res) => {
  try {
    // Get data from request body
    const data = req.body;

    // Delete the news feed
    const deletedFeed = await NFeed.deleteOne(data);

    res.send(deletedFeed);
  } catch (error) {
    console.error("Error finding news feed:", error);
    res.status(500).send("Internal server error");
  }
});

// Define port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () =>
  console.log("Server is running on port " + PORT)
);
