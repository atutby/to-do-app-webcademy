const addingForm = document.querySelector('#new-task-form');
const tasksContainer = document.querySelector('.mb-4');
const tasksList = document.querySelector('#tasks-list');
const datePlace = document.querySelector('.mb-5');

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const todaysDate = () => {
  const today = new Date();
  datePlace.insertAdjacentHTML('beforeend', `, ${today}`);
};

const makeDeleteButton = () => {
  return (
    `<button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>`
  );
};

const createTaskTemplate = (content) => {
  const deleteButton = makeDeleteButton();
  const id = getRandomNumber(0, 1000);
  return (
    `<li class="list-group-item d-flex justify-content-between" id="task${id}">
    <span class="task-title">${content}</span>
    ${deleteButton}
    </li>`
  );
};

const createEmptyTemplate = () => {
  return(
    `<div class="alert alert-dark" role="alert">
    На сегодня нет ни одной задачи!
    </div>`
  );
};

const insertEmptyTask = () => {
  const empty = createEmptyTemplate();
    tasksContainer.insertAdjacentHTML('beforebegin', empty);
};

const checkNoTasks = () => {
  const allTasks = document.querySelectorAll('.list-group-item ');
  if (allTasks.length === 0) {
    insertEmptyTask();
  }
};

const deleteEmptyTemplate = () => {
  const empty = document.querySelector('.alert-dark');
  if (empty) {
    empty.remove();
  }
};

const addNewTask = (task) => {
  tasksList.insertAdjacentHTML('afterbegin', task);
};

const deleteTask = (id) => {
  const task = document.getElementById(id);
  task.remove();
};

todaysDate();
checkNoTasks();

addingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const inputField = addingForm.querySelector('#addNewTask');
  const content = inputField.value;
  const newTask = createTaskTemplate(content);
  deleteEmptyTemplate();
  addNewTask(newTask);
  inputField.value = '';
});

tasksList.addEventListener('click', (evt) => {
  const element = evt.target;
  if (element.getAttribute('data-action') === 'delete-task') {
    const id = element.parentElement.id;
    deleteTask(id);
    checkNoTasks();
  }
});