var studentCount = document.getElementById('student-list').children.length;
var showItems = 10;
var pageItems = showItems - 1;
var pages = [];

//When the page loads, your program should hide all but the first 10 students in the list.
window.onload = function () {
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
//create an initial array of students
var studentArray = [];

//load students references into studentArray
var getStarted = function(){
    for(i = 0; i < studentCount; i++){
        studentArray.push(i);
    }
}

//function that will group the studentArray into pages based on the # of students and the desired items shown
var createGroupedArray = function(arr, chunkSize) {
    pages = [];
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    pages.push(groups);
}

var input = document.getElementById('search');
input.onkeyup = function () {
    var filter = input.value.toUpperCase();
    var lis = document.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        var name = lis[i].getElementsByClassName('name')[0].innerHTML;
        if (name.toUpperCase().indexOf(filter) == 0) 
            lis[i].style.display = 'list-item';
        else
            lis[i].style.display = 'none';
    }
}

//create an array of the li of the ul
//filter ul from items 0-9 or the first 10 items
//add event listener to paging buttons
//dynamically add paging buttons for each set of 10 or less

//add event handler to "search" ul by input value against name and maybe email and show all list items that match

