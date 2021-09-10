document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".main-part__button");
  const input = document.querySelector(".main-part__input");
  const taskList = document.querySelector(".task-list");
  const filter = document.querySelector(".task-filter__select");
  const clear = document.querySelector(".task__btn-clear");

  function createTask(toDo, id) {

    let item = `<li class="task-list__item" id="task-${id}" ><span class="task-list__span" >${toDo}</span>
		<div class="task-buttons">
			<img class="complete icons" src="images/success.svg" alt="">
			<img class="edit icons" src="images/font-selection-editor.svg" alt="">
			<img class="delete icons"  src="images/x-button.svg" alt="">
		</div>
    </li>`;

    taskList.insertAdjacentHTML("beforeend", item);
    addEventListeners(id);
  }

  function completeToDo(element) {
    // we store it to the variable so we don't have to use DOM-operation every time
    const classes = element.firstElementChild.classList;
	 console.log(classes);
    if (classes.value.includes("line-through")) {
      classes.remove("line-through");
    } else {
      classes.add("line-through");
    }
  }

  function removeToDo(element) {
    element.remove();
  }

  function editToDo(element) {
    const textElement = element.querySelector("span");

    if (!element.querySelector("input")) {
      const text = textElement.innerHTML;
      textElement.innerHTML = "";

      textElement.insertAdjacentHTML(
        "afterbegin",
        `<input type='text' class='input-edit' value=${text}>`
      );
      let inputEdit = document.querySelector(".input-edit");

      inputEdit.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
          textElement.innerHTML = inputEdit.value;
        }
      });

      inputEdit.addEventListener("blur", function () {
        console.log("change");
        textElement.innerHTML = inputEdit.value;
      });
    }
  }

  let id = 1;

  addButton.addEventListener("click", function () {
    let toDo = input.value;

    if (toDo) {
      createTask(toDo, id);

      input.value = "";
      id++;
    }
  });

  function filterToDo() {
    const filterActive = filter.value;

    switch (filterActive) {
      case "all":
        Array.from(document.querySelectorAll("li")).forEach((listElement) => {
          if (listElement.classList.contains("task-hidden")) {
            listElement.classList.remove("task-hidden");
          }
        });

        break;

      case "undone":
        Array.from(document.querySelectorAll("li")).forEach((listElement) => {
          if (
            !listElement.firstElementChild.classList.contains("line-through") &&
            listElement.classList.contains("task-hidden")
          ) {
            listElement.classList.remove("task-hidden");
          }
          if (
            listElement.firstElementChild.classList.contains("line-through") &&
            !listElement.classList.contains("task-hidden")
          ) {
            listElement.classList.add("task-hidden");
          }
        });

        break;

      case "done":
        Array.from(document.querySelectorAll("li")).forEach((listElement) => {
          if (
            listElement.firstElementChild.classList.contains("line-through") &&
            listElement.classList.contains("task-hidden")
          ) {
            listElement.classList.remove("task-hidden");
          }

          if (
            !listElement.firstElementChild.classList.contains("line-through") &&
            !listElement.classList.contains("task-hidden")
          ) {
            listElement.classList.add("task-hidden");
          }
        });

        break;
    }
  }

  filter.addEventListener("change", filterToDo);

  function addEventListeners(id) {
    const element = document.getElementById(`task-${id}`);
    const deleteButton = element.querySelector(".delete");
    const editButton = element.querySelector(".edit");
    const completeButton = element.querySelector(".complete");

    deleteButton.onclick = removeToDo.bind(this, element);
    completeButton.onclick = completeToDo.bind(this, element);
    editButton.onclick = editToDo.bind(this, element);
  }

  clear.addEventListener("click", () => {
    list = [];


    const allTasks = document.querySelectorAll("li");
    
    Array.from(allTasks).forEach((element) => {
      element.remove();
    });
  });
});
