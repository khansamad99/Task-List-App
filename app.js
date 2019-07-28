const form = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all events
loadEventListeners();
//console.log(form);
function loadEventListeners() {
    
   //DOM Load Events
   document.addEventListener('DOMContentLoaded',getTasks);
    //Add tasks
   form.addEventListener('submit',addTask);
   //Remove Task
   taskList.addEventListener('click',removeTask);
   //clear tasks
   clearBtn.addEventListener('click',clearTask);
   //filter Tasks
   filter.addEventListener('keyup',filterTasks);
}
function getTasks() {
    let task;
    if(localStorage.getItem('task')===null){
        task=[];
    }
    else
    {
        task=JSON.parse(localStorage.getItem('task'));
    }

    task.forEach(function(tasks){
        const li = document.createElement('li');
        li.className = 'collection-item'; //Add Class
        li.appendChild(document.createTextNode(tasks));
    
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link);
    
        taskList.appendChild(li);
    });

}
function addTask(e) {

    if(taskInput.value === " ") 
    {
        
        alert('Add a Task');
    }
    else{
    const li = document.createElement('li');
    li.className = 'collection-item'; //Add Class
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);

    taskList.appendChild(li);
    storeTaskLS(taskInput.value);
    taskInput.value = " ";
    }
    e.preventDefault();
}

function removeTask(e)
{
    console.log(e.target);
  if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you Sure?')){
     e.target.parentElement.parentElement.remove();

     removeTaskFromLS(e.target.parentElement.parentElement);
      }
  }
}

function clearTask() {
    taskList.innerHTML='';
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('collection-item').forEach
    (function(task){
       const item = task.firstChild.textContent;
       if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';
       }
       else{
           task.style.display = 'none';
       }
    }); 
}

function storeTaskLS(tasks) {

    let task;
    if(localStorage.getItem('task')===null){
        task=[];
    }
    else
    {
        task=JSON.parse(localStorage.getItem('task'));
    }

    task.push(tasks);
    localStorage.setItem('task',JSON.stringify(task));
}

function removeTaskFromLS(taskitem) {
    let task;
    if(localStorage.getItem('task')===null){
        task=[];
    }
    else
    {
        task=JSON.parse(localStorage.getItem('task'));
    }

    task.forEach(function(tasks,index){
        if(taskitem.textContent === tasks){
            task.splice(index,1);
        }
    });

    localStorage.setItem('task',JSON.stringify(task));
}