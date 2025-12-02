import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // Import multer
import chat from "./chat.js";

dotenv.config();

const app = express();
app.use(cors());

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const PORT = 5001;

let filePath;

// Upload with key = file and value = the pdf doc itself.
app.post("/upload", upload.single("file"), async (req, res) => {
  // Use multer as a middleware to handle file upload.
  filePath = req.file.path; // The path where the file is temporarily saved
  res.send(filePath + " upload successfully.");
});

app.get("/chat", async (req, res) => {
  const resp = await chat(filePath, req.query.question); // Use MCP-enhanced chat
  res.send({
    // Use rag and api to get answer.
    ragAnswer: resp.ragAnswer,
    mcpAnswer: resp.mcpAnswer,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

