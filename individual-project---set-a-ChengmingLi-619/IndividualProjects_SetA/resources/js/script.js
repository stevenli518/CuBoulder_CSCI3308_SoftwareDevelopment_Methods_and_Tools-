var review_btn = document.getElementById("Review_btn");
                        
var close_btn = document.getElementById("close_btn");

var modal = document.getElementById("exampleModal");

review_btn.onclick = function() {
  $('#exampleModal').modal('show')
    console.log(modal);
}

close_btn.onclick = function() {
  $('#exampleModal').modal('hide')
}