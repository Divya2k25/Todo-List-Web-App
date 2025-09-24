// DOM refs
const todoTask = document.querySelector("#toDoTask");
const todoBtn  = document.querySelector("#addBtn");
const todoList = document.querySelector("#list");
const filter   = document.querySelector("#filter");

// listeners
document.addEventListener("DOMContentLoaded",function(e){
  getTodo();
});
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", handleListClick); 
filter.addEventListener("change", filterTodo);        

// Add a todo
function addTodo(e) {
  e.preventDefault();
  const text = todoTask.value;
  if (!text) {
    alert("Please enter a task");
    return;
  }
  const wrapper = document.createElement("div");
  wrapper.className = "todoDiv";   
  const li = document.createElement("li");
  li.className = "todoList";
  li.textContent = text;

  setTodos(text);

  wrapper.appendChild(li);

  //creating complete button
  const completeBtn = document.createElement("button");
  completeBtn.className = "completeButton";
  completeBtn.textContent = "✅";
  wrapper.appendChild(completeBtn);

  //creating trash button
  const trashBtn = document.createElement("button");
  trashBtn.className = "trashButton";
  trashBtn.textContent = "🗑️";
  wrapper.appendChild(trashBtn);
 // append to list
  todoList.appendChild(wrapper);

  // reset input
  todoTask.value = "";
}

// complete or delete
function handleListClick(e) {
  const item = e.target;
  const todoWrapper = item.closest(".todoDiv");
  if (!todoWrapper) return;

  if (item.classList.contains("completeButton")) {
    todoWrapper.classList.toggle("completed");
  }
 
  if (item.classList.contains("trashButton")) {
    todoWrapper.remove();
    removeTodo(item.parentElement);
   }
   //delete completed task from localstorage
   if (item.classList.contains("completeButton") && todoWrapper.classList.contains("completed")) {
    removeTodo(item.parentElement);
}
}


// Filter function
function filterTodo(e) {
  const val = String(e.target.value).toLowerCase();
  const items = Array.from(todoList.children); 

  items.forEach((wrapper) => {
    const isCompleted = wrapper.classList.contains("completed");
    if (val === "all") {
      wrapper.style.display = ""; 
    } else if (val === "completed") {
      wrapper.style.display = isCompleted ? "" : "none";
    } else if (val === "uncompleted") {
      wrapper.style.display = !isCompleted ? "" : "none";
    }
  });
}

// set todos to localStorage
function setTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); 
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//get todos from localStorage
function getTodo(){
   let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); 
  }
  todos.forEach(function(todo){
    const text = todo;
  const wrapper = document.createElement("div");
  wrapper.className = "todoDiv";   
  const li = document.createElement("li");
  li.className = "todoList";
  li.textContent = text;
  wrapper.appendChild(li);

  //creating complete button
  const completeBtn = document.createElement("button");
  completeBtn.className = "completeButton";
  completeBtn.textContent = "✅";
  wrapper.appendChild(completeBtn);

  //creating trash button
  const trashBtn = document.createElement("button");
  trashBtn.className = "trashButton";
  trashBtn.textContent = "🗑️";
  wrapper.appendChild(trashBtn);
 // append to list
  todoList.appendChild(wrapper);

  // reset input
  todoTask.value = "";
  });
}

// remove function
function removeTodo(todo){
   let todos;
   if(localStorage.getItem("todos") === null){
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos")); 
   }
   const todoIndex = todo.children[0].innerText.trim();
   todos.splice(todos.findIndex(task => task.trim() === todoIndex), 1); 
   localStorage.setItem("todos", JSON.stringify(todos));
}
