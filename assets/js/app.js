const cl = console.log;

const formContainer = document.getElementById("formContainer");
const todo = document.getElementById("todo");
const todoContainer = document.getElementById("todoContainer");
const updateBtn = document.getElementById("update-btn");

function uid() {
  const timestamp = Date.now(); // Get the current timestamp (in milliseconds)
  const randomNum = Math.floor(Math.random() * 10000); // Generate a random number (0 to 9999)
  return `${timestamp}${randomNum}`; // Concatenate both to form the ID
}



let  todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];

const templateUl = (arr) => {
  let result = `<ul class="list-group">`;
  arr.forEach((ele) => {
    result += `<li id = "${ele.id}" class="list-group-item d-flex justify-content-between">
                <strong>${ele.todoItem}</strong>
                <span style="cursor:pointer">
                  <i class="px-2 fa-solid fa-pen-to-square text-primary" onClick="onEdit(this)"></i>
                  <i class="px-2 fa-solid fa-trash-can text-danger" onClick="onRemove(this)"></i>
                </span>
              </li>`;
  });
  result += `</ul>`;
  todoContainer.innerHTML = result;
};
 


templateUl(todoArr);

const onEdit = (e) => {
  let getId = e.closest("li").id;
  let getObj = todoArr.find((ele) => ele.id === getId);
  todo.value = getObj.todoItem;
  localStorage.setItem("getId", JSON.stringify(getId));

  updateBtn.classList.remove("d-none");
  document.getElementById("edit-btn").classList.add("d-none");
};

const onTodoAdd = (e) => {
  e.preventDefault();
  let newTodo = {
    todoItem: todo.value,
    id: uid(),
  };
  todoArr.push(newTodo);
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
  e.target.reset();
  if (document.querySelector("ul")) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between`;
    li.id = newTodo.id;
    li.innerHTML = `
                      
                        <strong>${newTodo.todoItem}</strong>
                        <span style="cursor : pointer">
                          <i class="px-2 fa-solid fa-pen-to-square text-primary" onClick="onEdit(this)"></i>
                          <i class="px-2 fa-solid fa-trash-can text-danger" onClick="onRemove(this)"></i>
                        </span>
                      `;
    ul.append(li);
  } else {
    let ul = document.createElement("ul");
    ul.className = `list-group`;
    ul.innerHTML = `
                    <li id = "${ele.id}" class="list-group-item d-flex justify-content-between">
                      <strong>${ele.todoItem}</strong>
                      <span style="cursor:pointer">
                        <i class="px-2 fa-solid fa-pen-to-square text-primary" onClick="onEdit(this)"></i>
                        <i class="px-2 fa-solid fa-trash-can text-danger" onClick="onRemove(this)"></i>
                      </span>
                    </li>
                    `;
  }
};

const onUpdate = (e) => {
  let updatedItem = todo.value;
  let updateId = JSON.parse(localStorage.getItem("getId"));
  let objIndex = todoArr.findIndex((ele) => ele.id === updateId);
  todoArr[objIndex].todoItem = updatedItem;
  formContainer.reset();
  cl(todoArr);
  let li = document.getElementById(updateId);
  li.firstElementChild.innerHTML = updatedItem;

  localStorage.setItem("todoArr", JSON.stringify(todoArr));
  e.target.classList.add("d-none");
  document.getElementById("edit-btn").classList.remove("d-none");
};

const onRemove = (e) => {
  let getId = e.closest("li").id;
  let rmItem = todoArr.findIndex((ele) => ele.id == getId);
  let ul = document.querySelector("ul");
  ul.removeChild(e.closest("li"));
  todoArr.splice(rmItem, 1);
  cl(todoArr);
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
};



formContainer.addEventListener("submit", onTodoAdd);
updateBtn.addEventListener("click", onUpdate);
