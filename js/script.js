(function () {
    'use strict';
    // this function is strict...

    //When the page loads, your program should hide all but the first 10 students in the list
    window.onload = function () {

        var studentCount = document.getElementById('student-list').children.length,
            pageItems = 10,
            pages = [],
            pageNumber = 0;

        //function to create an array of <li> references into studentArray
        function loadStudents() {
            var students = [],
                i = 0;
            for (i; i < studentCount; i += 1) {
                students.push(i);
            }
            return students;
        }

        //function to create an array of pages based on the # of students and the desired items shown
        function createGroupedArray(arr, chunkSize) {
            var groups = [],
                i = 0;
            for (i; i < arr.length; i += chunkSize) {
                groups.push(arr.slice(i, i + chunkSize));
            }
            pages.push(groups);
        }
        createGroupedArray(loadStudents(), pageItems);


        //funtion to load initial page items
        function showPageItems() {
            //hide all items
            var pageSelected = pages[0][pageNumber],
                hidden,
                i;
            for (i = 0; i < studentCount; i += 1) {
                hidden = document.getElementById('student-list').children[i].style.display = 'none';
            }
            //show only items for the selected page
            if (pageSelected !== undefined) {
                pageSelected.forEach(function (element) {
                    var show = document.getElementById('student-list').children[element].style.display = 'block';
                });
            }
        }
        showPageItems();


        //function to capture the innerHTML of target button clicked via event bubble then set pageNumber to the innerHTML
        function newPage(e) {
            //add active class to current page button
            if (e.target !== e.currentTarget) {
                document.getElementById('message').style.display = 'none';
                //for(i = 0; i < e.currentTarget)
                var clickedItem = e.target.innerHTML,
                    currentItem = document.querySelector('a.active');
                if (currentItem !== null) {
                    currentItem.classList.remove('active');
                }
                e.target.className = 'active';
                //problem:the current page button should be the only button with the active class
                pageNumber = (clickedItem - 1);
                showPageItems();
            }
            e.stopPropagation();
        }
        
        //insert pagination buttons
        function setPagination() {
            var i = pages[0].length,
                lis = document.getElementById('pagination'),
                pageLink;
            for (i; i > 0; i -= 1) {
                pageLink = '<li><a href="#">' + i + '</a></li>';
                lis.insertAdjacentHTML('afterbegin', pageLink);
            }
            return pages;
        }
        setPagination();
        
        var paginationButtons = document.querySelector('#pagination');
        paginationButtons.addEventListener("click", newPage, false);
        paginationButtons.querySelector('a').classList.add('active');
        
        function addSearch() {
            var searchBox = '<div class="student-search" id="student-search"><input type="text" id="search" class="search" placeholder="Search for students..."><button id="searchBtn">Search</button></div>',
                noResults = '<div id="message" style="display:none">No results.</div>';
            document.querySelector('.page-header').insertAdjacentHTML('beforeend', searchBox);
            document.querySelector('.list').insertAdjacentHTML('beforeend', noResults);
        }
        addSearch();
        
        //function to add onClick behaviors
        function setOnClick() {
            var searchBtn = document.getElementById('searchBtn'),
                input = document.getElementById('search');
            searchBtn.onclick = function () {
                var filter = input.value.toUpperCase(),
                    li = document.querySelector('#student-list').getElementsByTagName('li'),
                    records = [],
                    name,
                    email,
                    msg = document.getElementById('message'),
                    i;
                for (i = 0; i < li.length; i += 1) {
                    name = li[i].getElementsByClassName('name')[0].innerHTML.toUpperCase();
                    email = li[i].getElementsByClassName('email')[0].innerHTML.toUpperCase();
                    if (name.includes(filter) || email.includes(filter)) {
                        li[i].style.display = 'list-item';
                        records.push(i);
                    } else {
                        li[i].style.display = 'none';
                    }
                }
                if (records.length === 0) {
                    msg.style.display = 'block';
                } else {
                    msg.style.display = 'none';
                }
                if (input.value === '') {
                    showPageItems();
                    msg.style.display = 'none';
                }
            };
        }
        setOnClick();
    };
}());