var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;

db.on("error", function(){ console.log("Error")});
db.on("open", function(){
  var kittySchema = mongoose.Schema({
    name: String,
  });
  kittySchema.methods.speak = function(){
    var greeting = this.name ?
      "Meow name is " + this.name : 
      "I don't have a name";
    console.log(greeting);
  };

  var Kitten = mongoose.model("Kitten", kittySchema);
  var silence = new Kitten({ name: "silence" });
  console.log(silence.name);

  silence.save(function(err, silence) {
    if (err) {
      console.log(err)
      return;
    }
    silence.speak();
  });
});
