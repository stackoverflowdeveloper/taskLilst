// UI variables
const form=document.querySelector('#task-form'); 
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#task-filter'); 
const taskInput=document.querySelector('#task'); 

//event listeners 
function loadEventListeners(){
    // get items from local storages if any availabe
    document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
    // form on submit
    form.addEventListener('submit', newTask); 
    // delete task
    taskList.addEventListener('click', deleteTask); 
    // remove all tasks
    clearBtn.addEventListener('click', deleteAllTasks);
    // filter from keyboard input
    filter.addEventListener('keyup', filterTasks)
}

loadEventListeners();

// get tasks from Local Storage
function getTasksFromLocalStorage(){
    let tasks; 
    if(localStorage.getItem('tasks')===null) {
        tasks=[];
    } else {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // console.log(task);


        const li=document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(task));
        //create a elem
        const link=document.createElement('a'); 
        //html classes
        link.className='delete-item secondary-content'; 
        link.innerHTML='<i class="fas fa-trash-alt"</i>'
        
        //append elements
        li.appendChild(link); 
        taskList.appendChild(li);
    });
}



//new task f. 
function newTask(e){
    if(taskInput.value===''){
        console.log('empty input field');
    }
    else{

    //create li elem 
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //create a elem
    const link=document.createElement('a'); 
    //html classes
    link.className='delete-item secondary-content'; 
    link.innerHTML='<i class="fas fa-trash-alt"</i>'
    
    //append elements
    li.appendChild(link); 
    taskList.appendChild(li);
    
    //localStorage 
     taskListInLocalStorage(taskInput.value); 


    // console.log(li);
    
    }
    // stop standard btn action/reload 
    e.preventDefault(); 
    
    //change input value to empty -needs to be in the end of if/else statement - check 'if' to understand why  
    taskInput.value='';
}

// Delete single task f. 
function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(e.target);
        if(confirm('Delete this item?')){
        e.target.parentElement.parentElement.remove(); 
        //delete single task from local storage
            deleteTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}
function deleteTaskFromLocalStorage(taskItem){
    //console.log(taskItem);


    let tasks; 
    if(localStorage.getItem('tasks')===null) {
        tasks=[];
    } else {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.forEach(function(task, index){
        if(taskItem.textContent===task){
        tasks.splice(index, 1)        
        }


    });
    //changing localStorage to new list
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




function deleteAllTasks(){
    if(taskList.firstChild) {
        while(taskList.firstChild){
    
            // console.log(taskList.firstChild);
            taskList.removeChild(taskList.firstChild);
        } 
    }
    //remove all from local storage
    removeTasksFromLocalStorage();
}
function removeTasksFromLocalStorage(){
    localStorage.clear(); 
}

function filterTasks(e){
    const userInput=e.target.value.toLowerCase();
    console.log(userInput);

    const listItems=document.querySelectorAll('.collection-item');

    Array.from(listItems).forEach(function(task){
        // console.log(`task ${task}`);
         const item=task.firstChild.textContent;
             if(item.toLowerCase().indexOf(userInput) != -1){
                 task.style.display='block'; 
             } else{task.style.display='none';}

    });
}

function taskListInLocalStorage(task) {
    let tasks; 
    if(localStorage.getItem('tasks')===null) {
        tasks=[];
    } else {
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}