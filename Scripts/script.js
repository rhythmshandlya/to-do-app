let activeCount = 0;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/*
  Event listeners
*/
$(".delete").addEventListener("click", () => {
  $(".todos").innerHTML = "";
  activeCount = 0;
  refreshActiveCount();
});

$(".all").addEventListener("click", (e) => {
  changeToBlue("all");
  let todoList = $$(".todo");
  todoList.forEach((listItem) => {
    listItem.classList.remove("hide");
  });
});

$(".filter-active").addEventListener("click", (e) => {
  changeToBlue("filter-active");
  let todoList = $$(".todo");
  todoList.forEach((listItem) => {
    if (!listItem.classList.contains("active")) {
      listItem.classList.add("hide");
    } else {
      listItem.classList.remove("hide");
    }
  });
});

$(".filter-completed").addEventListener("click", (e) => {
  changeToBlue("filter-completed");
  let todoList = $$(".todo");
  todoList.forEach((listItem) => {
    if (listItem.classList.contains("active")) {
      listItem.classList.add("hide");
    } else {
      listItem.classList.remove("hide");
    }
  });
});

$(".dark-light").addEventListener("click", (e) => {
  if (e.target.innerHTML == "light_mode") {
    e.target.innerHTML = "dark_mode";
    $(".bg").classList.add("background_1");
    $(".bg").classList.remove("background_2");
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    $(".todo-form").classList.remove("light_2");
    $(".todo-input").classList.remove("light_2");
    const todoList = $$(".todo");
    todoList.forEach((todo) => {
      console.log(todo.classLis);
      todo.classList.remove("light_2");
      todo.classList.remove("todo-light");
      todo.classList.add("todo-dark");
    });
  } else {
    e.target.innerHTML = "light_mode";
    $(".bg").classList.add("background_2");
    $(".bg").classList.remove("background_1");
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    $(".todo-form").classList.add("light_2");
    $(".todo-input").classList.add("light_2");
    const todoList = $$(".todo");
    todoList.forEach((todo) => {
      todo.classList.add("light_2");
      todo.classList.remove("todo-dark");
      todo.classList.add("todo-light");
    });
  }
});

$(".todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let formInput = e.target.querySelector("input");
  let val = formInput.value;
  if (val.trim() == "") {
    return;
  }
  let newElement = document.createElement("div");
  let pName = document.body.classList.contains("light")
    ? "light_2 todo-light"
    : "todo-dark";
  newElement.setAttribute(
    "class",
    `todo active ${pName} animate__animated animate__fadeInLeft`
  );
  newElement.innerHTML = `<input type="checkbox" name="todo" id="" /> <label for="todo">${val}</label> <i class="material-icons">delete</i>`;
  $(".todos").append(newElement);
  var allTodos = $$(".todo");
  allTodos[allTodos.length - 1]
    .querySelector("i")
    .addEventListener("click", deleteTodo);
  allTodos[allTodos.length - 1]
    .querySelector("input")
    .addEventListener("click", markTodoAsDone);
  activeCount++;
  refreshActiveCount();
  formInput.value = "";
});
/*
  Utility Functions
*/

const deleteTodo = (e) => {
  const todo = e.target.parentNode;
  todo.parentNode.removeChild(todo);
  activeCount--;
  refreshActiveCount();
};

const markTodoAsDone = (e) => {
  let checkBox = e.target;
  if (checkBox.checked == true) {
    checkBox.parentNode.classList.remove("active");
    checkBox.parentNode.querySelector("label").innerHTML = `<s>${
      checkBox.parentNode.querySelector("label").innerHTML
    }</s>`;
  } else {
    checkBox.parentNode.classList.add("active");
    let content = checkBox.parentNode.querySelector("label").innerHTML;
    content = content.slice(3, content.length - 4);
    checkBox.parentNode.querySelector("label").innerHTML = content;
  }
};

const refreshActiveCount = () => {
  let activeCountElement = $(".items-left");
  activeCountElement.innerHTML =
    activeCount + activeCountElement.innerHTML.slice(1);
};

const changeToBlue = (ele) => {
  let btn = $$("span");
  for (let x = 1; x <= 3; x++) {
    if (btn[x].classList.contains(ele)) {
      btn[x].classList.add("selected");
    } else {
      btn[x].classList.remove("selected");
    }
  }
};
