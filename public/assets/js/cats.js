// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-sleep").on("click", function(event) {
    var id = $(this).data("id");
    var newSleep = $(this).data("newsleep");

    var newSleepState = {
      devoured: newSleep
    };

    // Send the PUT request.
    $.ajax("/api/sushi/" + id, {
      type: "PUT",
      data: newSleepState
    }).then(
      function() {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCat = {
      name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };
  
    console.log("sent");

    // Send the POST request.
    $.ajax("/api/sushi", {
      type: "POST",
      data: newCat
    }).then(
      function() {
        console.log("created new sushi");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  
  $(".delete-cat").on("click", function(event){
    var id = $(this).data("id");

  // Send the POST request.
  $.ajax("/api/sushi/" + id, {
    type: "DELETE"
  }).then(
    function() {
      console.log("deleted sushi", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});

});
