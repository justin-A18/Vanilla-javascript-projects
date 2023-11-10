const $dateNumber = document.querySelector("#dateNumber");
const $dateDay = document.querySelector("#dateDay");
const $dateMonth = document.querySelector("#dateMonth");
const $dateYear = document.querySelector("#dateYear");
const $order = document.querySelector("#order");

const $taskContainer = document.querySelector("#tasksContainer");

const $todo = document.querySelector("#todo");

const setDate = () => {
  const date = new Date();

  $dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  $dateDay.textContent = date.toLocaleString("es", { weekday: "long" });
  $dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  $dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
};

const addNewTask = (e) => {
  e.preventDefault();
  const { value } = e.target.taskText;
  let id = new Date().getTime();
  if (!value) return;

  const task = `
  <li class="list__items" data-id="${id}">
    <p class="items__text">${value}</p>
    <button class="items__btn" id="${id}">🗑️</button>
  </li>
  `;

  $taskContainer.insertAdjacentHTML("afterbegin", task);

  
  const $tasks = $taskContainer.querySelectorAll("li");

  $tasks.forEach((task) => {
    task.addEventListener("click", changeTaskState);
    const $btns = task.querySelectorAll(".items__btn");
    $btns.forEach((btn) => {
      btn.addEventListener("click", deleteTask);
    });
  });

  e.target.reset();
};

const deleteTask = (e) => {
  const task = $taskContainer.querySelector(`[data-id="${e.target.id}"]`);
  $taskContainer.removeChild(task);
};

const changeTaskState = (e) => {
  e.target.classList.toggle("complete");
};

const order = () => {
  const taskList = Array.from($taskContainer.children);
  const done = taskList.filter(el => el.classList.contains("complete"));
  const notDone = taskList.filter(el => !el.classList.contains("complete"));

  return [...done, ...notDone];
};

const renderOrderTask = () => {
  const orderedTasks = order();
  orderedTasks.forEach((el) => $taskContainer.appendChild(el));
};

setDate();
$todo.addEventListener("submit", addNewTask);
$order.addEventListener("click", renderOrderTask);
