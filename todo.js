const todoInput = document.querySelector(".ti");
const todoButton = document.querySelector(".tb");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getodo);
todoButton.addEventListener("click", addtd);
todoList.addEventListener("click", removetd);
filterOption.addEventListener("click", filtertd);

function addtd(e) {
  e.preventDefault();
  const tdiv = document.createElement("div");
  tdiv.classList.add("todo");
  const newtd = document.createElement("li");
  newtd.innerText = todoInput.value;
  newtd.classList.add("todo-item");
  tdiv.appendChild(newtd);
  savetolocal(todoInput.value);
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  tdiv.appendChild(completedButton);
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  tdiv.appendChild(trashButton);
  todoList.appendChild(tdiv);
  todoInput.value = "";
}

function removetd(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removefromlocal(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filtertd(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function savetolocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const tdiv = document.createElement("div");
    tdiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    tdiv.appendChild(newTodo);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    tdiv.appendChild(completedButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    tdiv.appendChild(trashButton);
    todoList.appendChild(tdiv);
  });
}

function removefromlocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoindex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoindex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
