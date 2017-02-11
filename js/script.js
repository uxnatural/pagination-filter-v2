//check if the browser has js enabled or add <noscript> message
/*
var studentList = new List('test-list', {
  valueNames: ['name', 'email'],
  page: 10,
  pagination: true
});

$('#search').on('keyup', function() {
  var searchString = $(this).val();
  studentList.search(searchString);
});

var studentCount = document.getElementById('student-list').childElementCount;
*/

var studentCount = document.getElementById('student-list').children.length;
var showItems = 10;
var pageItems = showItems - 1;
var pages = studentCount / showItems;

//When the page loads, your program should hide all but the first 10 students in the list.
window.onload = function(){
    for(i = (studentCount - 1); i > pageItems; i--) {
        var hidden = document.getElementById('student-list').children[i].style.display = 'none';
    }
}
function pageTurn(pageNumber){
    var rangeEnd = Math.floor((pages - pageNumber)*10);
    var rangeStart = pageNumber * pageItems;
    
    console.log(rangeStart + ", " + rangeEnd)
    
    for(i = 0; i < studentCount; i++){
        var hidden = document.getElementById('student-list').children[i].style.display = 'none';
    }
    for(i = rangeEnd - 1; (i <= rangeEnd && i > rangeStart); i--) {
    // for(i = 53; (i <= 54 && i >= 50); i-- ){
       var show = document.getElementById('student-list').children[i].style.display = 'block';
       console.log(i);
    }
}

//create an array of the li of the ul
//filter ul from items 0-9 or the first 10 items
//add event listener to paging buttons
//dynamically add paging buttons for each set of 10 or less

//add event handler to "search" ul by input value against name and maybe email and show all list items that match

