const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("ui"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.path);
    var type = req.path.split("/")[2];
    cb(null, type); // specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // specify the filename
  },
});

// create the multer instance
const upload = multer({ storage: storage });

app.listen("3000", () => {
  console.log("Server Started On PORT: 3000");
});

app.post("/store/:type", upload.single("image"), function (req, res) {
  res.send("File uploaded successfully!");
});
