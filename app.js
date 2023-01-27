const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//Connecting DB
mongoose.connect(
  "mongodb+srv://saurav4geeks:<password>@cluster0.lsiqumg.mongodb.net/SkillMasterDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      console.log("<----------------------------------------------->");
      console.log("DB filed to connect : " + err.message);
      console.log("<----------------------------------------------->");
      return;
    } else {
      console.log(`DB Connected successfully`);
      console.log("<----------------------------------------------->");
    }
  }
);
//Database Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNo: Number,
  Address: String,
  Skills: [
    {
      skill: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
});
//Database functions
const Employee = mongoose.model("Employee", employeeSchema);
const employee1 = new Employee({
  name: "Saurav",
  email: "sauravsuman5980@gmail.com",
  mobileNo: 9155962770,
  Address: "Patna,India",
  Skills: [
    {
      skill: "CSS",
      rating: 5,
    },
    {
      skill: "Javascript",
      rating: 4,
    },
  ],
});
const employee2 = new Employee({
  name: "Andrew",
  email: "notandrew@gmail.com",
  mobileNo: 9155965649,
  Address: "New York, USA",
  Skills: [
    {
      skill: "Python",
      rating: 3,
    },
    {
      skill: "C++",
      rating: 2,
    },
  ],
});
// Test Push
// const defaultEmployee = [employee1, employee2];
// Employee.insertMany(defaultEmployee, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Pushed default employees to DB");
//   }
// });

//App functions
app.get("/", function (req, res) {
  Employee.find({}, function (err, foundEmployees) {
    res.render("index", { Employees: foundEmployees });
  });
});

app.post("/add", function (req, res) {
  const Ename = req.body.Ename;
  const email = req.body.email;
  const Mnumber = req.body.number;
  const address = req.body.address;
  const skill = [];
  const employee = new Employee({
    name: Ename,
    email: email,
    mobileNo: Mnumber,
    Address: address,
    Skill: skill,
  });
  employee.save();
  res.redirect("/");
});
app.post("/delete", function (req, res) {
  const ItemId = req.body.del;
  Employee.findByIdAndRemove(ItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted the employee.");
      res.redirect("/");
    }
  });
});
app.post("/update",function(req,res){
    
})
app.listen(3000, function () {
  console.log("App started at PORT:3000");
});
