(function () {
    'use strict';
    // this function is strict...

    //When the page loads, your program should hide all but the first 10 students in the list
    window.onload = function () {

        //create an initial array of students
        var studentArray = [],
            studentCount = document.getElementById('student-list').children.length,
            showItems = 10,
            pageItems = showItems - 1,
            pages = [],
            pageNumber = 0,
            msgTxt = '<div id="message" style="display:none">No results.</div>',
            searchBox = '<div class="student-search" id="student-search"><input type="text" id="search" class="search" placeholder="Search for students..."><button id="searchBtn">Search</button></div>',
            //load li references into studentArray
            loadStudents = (function () {
                var i;
                for (i = 0; i < studentCount; i += 1) {
                    studentArray.push(i);
                }
            }()),
            createGroupedArray = function (arr, chunkSize) {
                pages = [];
                var groups = [],
                    i;
                for (i = 0; i < arr.length; i += chunkSize) {
                    groups.push(arr.slice(i, i + chunkSize));
                }
                pages.push(groups);
            };

        //function that will group the studentArray into pages based on the # of students and the desired items shown
        createGroupedArray(studentArray, showItems);


        //insert pagination buttons
        function setPagination() {
            var i = pages[0].length,
                lis = document.getElementById('pagination'),
                pagination;
            for (i; i > 0; i -= 1) {
                pagination = '<li><a href="#">' + i + '</a></li>';
                lis.insertAdjacentHTML('afterbegin', pagination);
            }
            return pages;
        }
        setPagination();

        //showPageItems function
        function showPageItems() {
            //hide all items
            var pageSelected = pages[0][pageNumber],
                activeCurrent = document.getElementById('pagination').getElementsByTagName('li')[pageNumber].firstChild,
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


        //add event to capture the innerHTML of the target button clicked via event bubble then set pageNumber to the innerHTML
        function newPage(e) {
            //add active class to current page button
            if (e.target !== e.currentTarget) {
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
        
        function setOnClick() {
            //add event listener to the pagination and capture the innerHTML of the target button clicked via event bubble
            document.querySelector('.page-header').insertAdjacentHTML('beforeend', searchBox);
            document.querySelector('.list').insertAdjacentHTML('beforeend', msgTxt);
            var theParent = document.querySelector('#pagination'),
                input = document.getElementById('search'),
                button = document.getElementById('searchBtn');
            theParent.addEventListener("click", newPage, false);
            theParent.querySelector('a').classList.add('active');
            //add search input

            button.onclick = function () {
                var filter = input.value.toUpperCase(),
                    lis = document.querySelector('#student-list').getElementsByTagName('li'),
                    records = [],
                    name,
                    email,
                    msg = document.getElementById('message'),
                    i;

                for (i = 0; i < lis.length; i += 1) {
                    name = lis[i].getElementsByClassName('name')[0].innerHTML.toUpperCase();
                    email = lis[i].getElementsByClassName('email')[0].innerHTML.toUpperCase();
                    if (name.includes(filter) || email.includes(filter)) {
                        lis[i].style.display = 'list-item';
                        records.push(i);
                    } else {
                        lis[i].style.display = 'none';
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