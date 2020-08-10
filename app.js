const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crudDATA");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

const dataSchema = {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    status: String,
};

const Data = mongoose.model("CrudDATA", dataSchema);

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const gender = req.body.gender;
    const age = req.body.age;
    const status = req.body.status;

    const data = new Data({
        email: email,
        password: password,
        firstName: fname,
        lastName: lname,
        age: age,
        gender: gender,
        status: status,
    });
    await data.save();
    res.redirect("/");
});

app.get("/show", async (req, res) => {
    await Data.find((err, data) => {
        console.log(data);
        res.render("show", {
            data: data,
        });
    });
});


app.get("/update", (req, res) => {
    res.render("update");
});

app.post("/update", (req, res) => {
    Data.findOneAndUpdate({ firstName: req.body.updatefname}, { 
      "$set" :{ "email": req.body.email,
        "password": req.body.password,
        "firstName": req.body.fname,
        "lastName": req.body.lname,
        "gender": req.body.gender,
        "age": req.body.age,
        "status": req.body.status}
    }, (err) => {
        console.log('====================================');
        console.log(Data);
        console.log('====================================');
        if (err) {
            console.log('-----------error-------------', err);
        } else {
            console.log("-----------------Updated----------------");
        }
    })
    res.redirect("/update");
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
