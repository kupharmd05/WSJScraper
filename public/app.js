$(document).ready(function () {

  function getArticles() {
    $.getJSON("/articles", function (data) {
      // For each one
      for (var i = 0; i < 10; i++) {
        // Display the information on the page
        $("#articles").append("<div class='article card mb-3'><a href =" + data[i].link + "<p class='articleTitle card-header font-weight-bold'>" + data[i].title + "</a><br><div class='summary card-body' data-id=" + data[i]._id + ">" + data[i].summary + "</div>" + "<a class='btn btn-success save' data-id=" + data[i]._id + "> Save </a><br><a class='btn btn-success note' data-id=" + data[i]._id + "> Add Note </a></p></div>");

      }
    }
    )
  };

  function getSaved() {
    $.getJSON("/saved", function (data) {
      // For each one
      for (var i = 0; i < 20; i++) {
        // Display the information on the page
        $("#articles").append("<div class='article card mb-3'><a href =" + data[i].link + "<p class='articleTitle card-header'>" + data[i].title + "</a><br><div class='summary card-body' data-id='" + data[i]._id + "'>" + data[i].summary + "</div>" + "<a class='btn btn-success remove' data-id='" + data[i]._id + "'> Remove </a></p></div>");

      }
    }
    )
  };

  $(".new-scrape").on("click", function (event) {
    event.preventDefault();
    $("#articles").empty();
    $.get("/scrape").then(function (data) {
      console.log(data);
      getArticles();

    })
  })
  $(".clear").on("click", (event) => {


    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/clear",
      success: function (response) {
        $("#articles").empty();
        $("#articles").text("Please Scrape New Articles")
      }

    });

  });



  $(document).on("click", ".save", function () {


    var articleToSave = $(this).attr("data-id");
    console.log($(this).attr("data-id"));
    $(this).parents(".card").remove();
    $.ajax({
      method: "PUT",
      url: "/saved/" + articleToSave
    }).then(function (data) {
      console.log(data);
    })
  })

  $(document).on("click", ".remove", function (event) {


    var articleToSave = $(this).attr("data-id");
    console.log($(this).attr("data-id"));
    $(this).parents(".card").remove();

    $.ajax({
      method: "PUT",
      url: "/remove/" + articleToSave
    }).then(function (data) {
      console.log(data);

    })
  })

  $(".savedArticle").on("click", function (event) {
    event.preventDefault();
    $("#articles").empty();
    $("#notes").empty();
    $.get("/saved").then(function (data) {
      console.log(data);
      getSaved();

    })
  })

  $(document).on("click", ".note", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    console.log(this);

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2><input id='titleinput' name='title' placeholder = 'Note Title'><textarea id='bodyinput' name='body '></textarea><button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        // An input to enter a new title
        // $("#notes").append("<input id='titleinput' name='title' placeholder=Title>");
        // // A textarea to add a new note body
        // $("#notes").append("<textarea id='bodyinput' name='body '></textarea>");
        // // A button to submit a new note, with the id of the article saved to it
        // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log(thisId)

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  getArticles();
})



