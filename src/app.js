require("../index");
const express = require("express");
const path = require("path");
const connectDB = require("./db/connect");
const users = require("./models/users");

// const data_routes = require("./routes/data");

const app = express();

const PORT = process.env.port || 5000;

const static_path = path.join(__dirname, "../public")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));

// app.get("/", (req, res) => {
//   res.send("Hello World");
// })

app.post("/", async (req, res) => {
  try {
    const spacialCharactor = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const number = /\d/;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (password === confirm_password) {
      if (password.length >= 8 && spacialCharactor.test(password) && number.test(password)) {
        const user = new users({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          confirm_password: req.body.confirm_password
        })

        await user.save();
        res.status(201).send("Success");
      }
      else {
        res.send("Password invalid");
      }

    }
    else {
      res.send("Password is not matched")
    }

  } catch (error) {
    res.status(400).send(error)
  }
})

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`You are connected with localhost:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start();