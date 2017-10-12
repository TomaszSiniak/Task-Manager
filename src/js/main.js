document.addEventListener('DOMContentLoaded', function() {

    // burger animation 
    const burger = document.querySelector('.burger-container');

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
    });

    // show/hide menu
    const menuToggle = document.querySelector('.main-nav');

    burger.addEventListener('click', () => {
        menuToggle.classList.toggle('show-menu');
    });


    // scrollTo - smooth scrolling plugin

    $(function($) {
        $.scrollTo(0);
        $('#homeSub').click(function() {
            $.scrollTo($('#page-header'), 500);
        });
        $('#addSub').click(function() {
            $.scrollTo($('.new-task-container'), 500);
        });
    });



    // call a function to show task 

    bindNewTask();
    fetchTasks();





    // --------------------------   ADD NEW TASK ---------------------------------------

    function addNewTask(title) {

        //variables
        const newLi = document.createElement('li');

        const selectBox = document.querySelector('#select-box');
        const selectDay = selectBox.options[selectBox.selectedIndex].value;

        const monday = document.querySelector('#monday');
        const tuesday = document.querySelector('#tuesday');
        const wednesday = document.querySelector('#wednesday');
        const thursday = document.querySelector('#thursday');
        const friday = document.querySelector('#friday');
        const saturday = document.querySelector('#saturday');
        const sunday = document.querySelector('#sunday');

        //creating new li element,add class

        newLi.classList.add('weekday-tasks__item');
        // add task look
        newLi.innerHTML = prepareTask(title);

        // assigned to proper weekday after select

        if (selectDay === "monday") {
            monday.appendChild(newLi);
        } else if (selectDay === "tuesday") {
            tuesday.appendChild(newLi);
        } else if (selectDay === "wednesday") {
            wednesday.appendChild(newLi);
        } else if (selectDay === "thursday") {
            thursday.appendChild(newLi);
        } else if (selectDay === "friday") {
            friday.appendChild(newLi);
        } else if (selectDay === "saturday") {
            saturday.appendChild(newLi);
        } else if (selectDay === "sunday") {
            sunday.appendChild(newLi);
        }


        // remove task from the list
        const deleteBtn = newLi.querySelector('.icons-box__icon-delete');

        deleteBtn.addEventListener('click', (e) => {
            const li = e.target.parentElement.parentElement.parentElement;
            li.parentNode.removeChild(li);

        })


        // toggle done task
        const completeTask = newLi.querySelector('.icons-box__icon-complete');

        completeTask.addEventListener('click', (e) => {

            const li = e.target.parentElement.parentElement.parentElement;
            const icon = e.target;
            const comment = newLi.querySelector('.icons-box__comment');

            icon.classList.toggle('done-icon');
            comment.classList.toggle('fade');
            li.classList.toggle('done-task');

        })
    };

    //task structure
    function prepareTask(title) {
        return '<div class = "task-title">' + title + '</div>' +
            '<div class = "icons-box">' +
            '<p class="icons-box__comment">Done !</p>' +
            '<figure class = "icons-box__icon icons-box__icon-complete"><i class = "fa fa-check-circle fa-2x" aria-hidden = "true"></i></figure>' +
            '<figure class = "icons-box__icon icons-box__icon-delete"> <i class = "fa fa-minus-circle fa-2x" aria-hidden = "true"></i></figure > ' +
            '</div>'
    };

    //add ready task to main list
    function bindNewTask() {
        const newTaskForm = document.querySelector('.new-task-container');

        newTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.querySelector('input').value;

            if (title) {
                addNewTask(title);
            }
            saveTasks();
            newTaskForm.reset();
        })

    };


    // ------------------- SAVE IN LOCALSTORAGE ----------------------


    function saveTasks() {

        const title = document.querySelector('input').value;
        const selectBox = document.querySelector('#select-box');
        const day = selectBox.options[selectBox.selectedIndex].value;

        //task info to save
        const task = {
            title: title,
            chosenDay: day

        }

        if (localStorage.getItem('allTasks') === null) {
            //if doesnt exist - init array
            const allTasks = [];
            // and push task to this array
            allTasks.push(task);
            // and set to local storage
            localStorage.setItem('allTasks', JSON.stringify(allTasks))
        } else {
            //  get tasks from local storage
            const allTasks = JSON.parse(localStorage.getItem('allTasks'));
            // and add task to array
            allTasks.push(task);
            // and re-set back to local storage
            localStorage.setItem('allTasks', JSON.stringify(allTasks));
        }


    }


    // get task from localStorage

    function fetchTasks() {

        const allTasks = JSON.parse(localStorage.getItem('allTasks'));

        if (allTasks !== null) {
            for (i = 0; i < allTasks.length; i++) {
                const title = allTasks[i].title;
                const day = allTasks[i].chosenDay;

                //variables
                const newLi = document.createElement('li');


                const monday = document.querySelector('#monday');
                const tuesday = document.querySelector('#tuesday');
                const wednesday = document.querySelector('#wednesday');
                const thursday = document.querySelector('#thursday');
                const friday = document.querySelector('#friday');
                const saturday = document.querySelector('#saturday');
                const sunday = document.querySelector('#sunday');

                //creating new li element,add class

                newLi.classList.add('weekday-tasks__item');
                // add task look
                newLi.innerHTML = prepareTask(title);
                if (day === "monday") {
                    monday.appendChild(newLi);
                } else if (day === "tuesday") {
                    tuesday.appendChild(newLi);
                } else if (day === "wednesday") {
                    wednesday.appendChild(newLi);
                } else if (day === "thursday") {
                    thursday.appendChild(newLi);
                } else if (day === "friday") {
                    friday.appendChild(newLi);
                } else if (day === "saturday") {
                    saturday.appendChild(newLi);
                } else if (day === "sunday") {
                    sunday.appendChild(newLi);
                }
                // remove task from the list
                const deleteBtn = newLi.querySelector('.icons-box__icon-delete');

                deleteBtn.addEventListener('click', (e) => {
                    const li = e.target.parentElement.parentElement.parentElement;
                    li.parentNode.removeChild(li);

                })


                // toggle done task
                const completeTask = newLi.querySelector('.icons-box__icon-complete');

                completeTask.addEventListener('click', (e) => {

                    const li = e.target.parentElement.parentElement.parentElement;
                    const icon = e.target;
                    const comment = newLi.querySelector('.icons-box__comment');

                    icon.classList.toggle('done-icon');
                    comment.classList.toggle('fade');
                    li.classList.toggle('done-task');

                })
            }
        } else {
            console.log("there is no saved tasks dude")
        }

    }
});