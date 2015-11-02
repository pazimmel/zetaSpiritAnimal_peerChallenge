var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/zeta_spirit_animal');
mongoose.model('Person', new Schema({"name": String, "spirit animal": String}, {collection: 'zeta'}));
var Person = mongoose.model('Person');

app.set("port", process.env.PORT || 5000);

app.get('/data', function(req,res){

   var query = req.query.peopleSearch;

    if(query == "") {
        Person.find({}, function (err, data) {
            if (err) {
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });
    } else {
        Person.find({"name": query}, function (err, data) {
            if (err) {
                console.log("ERROR! : ", err);
            }
            res.send(data);
        });
    }
});


app.get("/*", function(req, res){
    var file = req.params[0] || "/views/index.html";
    res.sendfile(path.join(__dirname, "./public", file));
});

app.listen(app.get("port"), function(){
    console.log("listening on port...", app.get("port"));
});