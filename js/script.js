

//When the page loads, your program should hide all but the first 10 students in the list.
//window.onload = function () {
    
    //create an initial array of students
    var studentArray = [];    
    var studentCount = document.getElementById('student-list').children.length;
    var showItems = 10;
    var pageItems = showItems - 1;
    var pages = new Array ();
    var pageNumber = 0;

    //load li references into studentArray
    var loadStudents = function loadStudents(){
        for(i = 0; i < studentCount; i++){
            studentArray.push(i);
        }
        console.log("students are loaded");
    }
    loadStudents();
 
    //function that will group the studentArray into pages based on the # of students and the desired items shown
    var createGroupedArray = function(arr, chunkSize) {
        pages = [];
        var groups = [], i;
        for (i = 0; i < arr.length; i += chunkSize) {
            groups.push(arr.slice(i, i + chunkSize));
        }
        pages.push(groups);
        console.log('pages are set');
    }
    createGroupedArray(studentArray,showItems);
    

    //insert searchbox input
    document.getElementById('student-search').innerHTML = '<input type="text" id="search" class="search" placeholder="Search for students..." /><button>Search</button>';
    
    //insert pagination buttons
    for(i = pages[0].length; i > 0; i--){
        var lis = document.getElementById('pagination');
        var pagination = '<li><a class="active" href="#">' + i + '</a></li>';
        lis.insertAdjacentHTML('afterbegin',pagination);
    }
    
    //add event listener to the pagination and capture the innerHTML of the target button clicked via event bubble
    var theParent = document.querySelector('#pagination');
    theParent.addEventListener("click", newPage, false);

    //add event to capture the innerHTML of the target button clicked via event bubble then set pageNumber to the innerHTML
    function newPage(e) {
        if (e.target !== e.currentTarget) {
            var clickedItem = e.target.innerHTML;
            pageNumber = (clickedItem - 1);
            showPageItems();
        }
        e.stopPropagation();
    }
    
    //showPageItems function
    function showPageItems(){
         //hide all items
        var pageSelected = pages[0][pageNumber];
        //hide all items
        for(i = 0; i < studentCount; i++){
            var hidden = document.getElementById('student-list').children[i].style.display = 'none';
        }
        //show only items for the selected page
        if (pageSelected !== undefined){
            pageSelected.forEach(function(element) {
                var show = document.getElementById('student-list').children[element].style.display = 'block';
            });
        } else {
            console.log("out of bounds")
        }

    }
    showPageItems();

    //hide all but the first page of students
/*
    for(i = 53; i > pages[0][0].length; i--) {
        var hidden = document.getElementById('student-list').children[i].style.display = 'none';
    }
    console.log("windows is loaded");
//}
/* hide stuff
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
*/

var input = document.getElementById('search');
input.onkeyup = function () {
    var filter = input.value.toUpperCase();
    //var lis = document.getElementsByTagName('li');
    var lis = document.querySelector('#student-list').children;
    for (var i = 0; i < lis.length; i++) {
        var name = lis[i].getElementsByClassName('name')[0].innerHTML;
        var email = lis[i].getElementsByClassName('email')[0].innerHTML;
        if (name.toUpperCase().indexOf(filter) == 0) 
            lis[i].style.display = 'list-item';
        else
            lis[i].style.display = 'none';
    }
    if (input.value == ''){
        showPageItems();
    }
}


