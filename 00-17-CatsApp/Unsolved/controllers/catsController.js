var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var sushi = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  sushi.all(function(data) {
    var hbsObject = {
      sushis: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/cats", function(req, res) {
sushi.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  sushi.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function(req, res) {
  var condition = "id =" + req.params.id;
  sushi.delete(condition, function(result){
    if(result.affectedRows ==0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
    });
});


// Export routes for server.js to use.
module.exports = router;
