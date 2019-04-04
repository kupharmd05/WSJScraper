$(document).ready(function () {

  function getArticles() {
  $.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < 20; i++) {
      // Display the information on the page
      $("#articles").append("<div class='article'><a href =" + data[i].link + "<p class='articleTitle'>" + data[i].title + "</a><br><p class='summary'>"+data[i].summary +"</p>" + "<a class='btn btn-success save' data-id='"+data[i]._id +"'> Save </a></p></div>");

    }}
  )};

  function getSaved() {
    $.getJSON("/saved", function (data) {
      // For each one
      for (var i = 0; i < 20; i++) {
        // Display the information on the page
        $("#articles").append("<div class='article'><a href =" + data[i].link + "<p class='articleTitle'>" + data[i].title + "</a><br><p class='summary'>"+data[i].summary +"</p>" + "<a class='btn btn-success save' data-id='"+data[i]._id +"'> Save </a></p></div>");
  
      }}
    )};

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
      success: function(response){
        $("#articles").empty();
      }
    
    });

  });



  $(document).on("click",".save", (event) => {
    alert("this hit")
    var articleToSave = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/saved/" + articleToSave
    }).then(function(data){
      console.log(data);
    })
  })

  $(".savedArticle").on("click", function (event) {
    event.preventDefault();
    $("#articles").empty();
    $.get("/saved").then(function (data) {
      console.log(data);
      getSaved();
      
    })
  })


getArticles();
})



