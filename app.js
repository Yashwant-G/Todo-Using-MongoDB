//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-yashwant:Testing@cluster0.kd2lh.mongodb.net/todolistDB", {useNewUrlParser: true,});

const ItemSchema={
  name: String
};

const Collect=mongoose.model("Item",ItemSchema);

const first= new Collect({
  name: "Wake up"
})
const second= new Collect({
  name: "Eat"
})
const third= new Collect({
  name: "Sleep"
})

const iarray=[first, second, third];


app.get("/", function (req, res) {
  Collect.find({},function(err,result){
    if(result.length==0){
      Collect.insertMany(iarray,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Insertion Success");
        }
      });
      res.redirect("/");    
    }else{
      res.render("list", { listTitle: "Today", newListItems: result });
    }
  });
});

app.post("/", function (req, res) {
  const Nextitem = req.body.newItem;
  const fourth= new Collect({
    name: Nextitem
  });
  fourth.save();
  res.redirect("/");

});

app.post("/delete",function(req,res){
  const CheckedItem=req.body.check;
  Collect.findByIdAndRemove(CheckedItem,function(err){
    if(err){
      console.log(err);
    }else{
      console.log("success");
    }
  });
  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
