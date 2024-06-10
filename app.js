const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./models/userModel");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const upload = multer({ dest: "public/images/uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/userDataPage");
});

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash("password", salt, (err, hash) => {
    console.log("hash", hash);
  });
});

app.post("/create", upload.single("image"), (req, res) => {
  let { username, email, mobile, password, address } = req.body;
  bcrypt.genSalt(10, async (err, salt) => {
    const image = req.file ? `/images/uploads/${req.file.filename}` : null;
    const allUser = await userModel.create({
      username,
      email,
      mobile,
      password: hash,
      address,
      image,
    });
    bcrypt.hash("password", salt, (err, hash) => {
      console.log("hash", hash);
    });
  });

  //   res.send(allUser);
  console.log(req.file);
  res.redirect("/userDataPage");
});

app.get("/userDataPage", async (req, res) => {
  let readUser = await userModel.find();
  res.render("userDataPage", { readUser });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
