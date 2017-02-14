//When the page loads, your program should hide all but the first 10 students in the list.
window.onload = function () {
    
    //create an initial array of students
    var studentArray = [];    
    var studentCount = document.getElementById('student-list').children.length;
    var showItems = 10;
    var pageItems = showItems - 1;
    var pages = new Array ();
    var pageNumber = 0;
   // var setActivePage = document.querySelector('a').contains('1')

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
    var searchBox = '<input type="text" id="search" class="search" placeholder="Search for students..." /><button id="searchBtn" >Search</button>';
    document.getElementById('student-search').innerHTML = searchBox;
    
    //insert pagination buttons
    for(i = pages[0].length; i > 0; i--){
        var lis = document.getElementById('pagination');
        var pagination = '<li><a href="#">' + i + '</a></li>';
        lis.insertAdjacentHTML('afterbegin',pagination);
    }
    
    //add event listener to the pagination and capture the innerHTML of the target button clicked via event bubble
    var theParent = document.querySelector('#pagination');
    theParent.addEventListener("click", newPage, false);

    //add event to capture the innerHTML of the target button clicked via event bubble then set pageNumber to the innerHTML
    function newPage(e) {
        //add active class to current page button
        if (e.target !== e.currentTarget) {
            //for(i = 0; i < e.currentTarget)
            var clickedItem = e.target.innerHTML;
            var currentItem = document.querySelector('a.active');
            if(currentItem !== null){
                currentItem.classList.remove('active')
            }
            e.target.className = 'active';
            //problem:the current page button should be the only button with the active class
            pageNumber = (clickedItem - 1);
            showPageItems();
        }
        e.stopPropagation();
    }  
    //showPageItems function
    function showPageItems(){
         //hide all items
        var pageSelected = pages[0][pageNumber];
        var activeCurrent = document.getElementById('pagination').getElementsByTagName('li')[pageNumber].firstChild;
        //hide all items
        for(i = 0; i < studentCount; i++){
            var hidden = document.getElementById('student-list').children[i].style.display = 'none';
        }
        //show only items for the selected page
        if (pageSelected !== undefined){
            pageSelected.forEach(function(element) {
                var show = document.getElementById('student-list').children[element].style.display = 'block';
            });
        }

    }
    showPageItems();


//
    var input = document.getElementById('search');
    var button = document.getElementById('searchBtn');
    //input.onkeyup = function () {
    button.onclick = function () {
        var filter = input.value.toUpperCase();
        //var lis = document.getElementsByTagName('li');
        var lis = document.querySelector('#student-list').children;
        var records = [];
        for (var i = 0; i < lis.length; i++) {
            var name = lis[i].getElementsByClassName('name')[0].innerHTML.toUpperCase();
            var email = lis[i].getElementsByClassName('email')[0].innerHTML.toUpperCase();
            //if (name.toUpperCase().indexOf(filter) == 0)
            if (name.includes(filter) || email.includes(filter)) {
                lis[i].style.display = 'list-item';
                records.push(i);
            }
            else {
                lis[i].style.display = 'none';    
            }
        }
        if(records.length == 0){
            message.style.display = 'block';
        } else {
            message.style.display = 'none'
        }
        if (input.value == ''){
            showPageItems();
        }
    }
}