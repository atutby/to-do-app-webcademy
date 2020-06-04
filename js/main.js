const EMPTY_ALERT = 'На сегодня нет ни одной задачи!';
const ADDED_ALERT = 'Задача добавлена!';
const DELETED_ALERT = 'Задача удалена!';
const DELAY = 1000;

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
    <span class="task-title" contenteditable="true">${content}</span>
    ${deleteButton}
    </li>`
  );
};

const createAlertTemplate = (text, color) => {
  return(
    `<div class="alert alert-${color}" role="alert">
    ${text}
    </div>`
  );
};

const makeAlert = (type) => {
  switch(type) {
    case 'empty':
      return createAlertTemplate(EMPTY_ALERT, 'dark');
    case 'added':
      return createAlertTemplate(ADDED_ALERT, 'success');
    case 'deleted':
      return createAlertTemplate(DELETED_ALERT, 'danger');
  }
};

const insertAlert = (type) => {
  const empty = makeAlert(type);
    tasksContainer.insertAdjacentHTML('beforebegin', empty);
};

function removeElement(elementClass) {
  let elements = document.getElementsByClassName(elementClass);
  while (elements.length) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

const deleteAlerts = () => {
  const alerts = document.getElementsByClassName('alert');
  while (alerts.length) {
    alerts[0].parentNode.removeChild(alerts[0]);
  }
};

const checkNoTasks = () => {
  const allTasks = document.getElementsByClassName('list-group-item');
  if (allTasks.length === 0) {
    insertAlert('empty');
  }
};

const addNewTask = (task) => {
  tasksList.insertAdjacentHTML('afterbegin', task);
};

const deleteTask = (id) => {
  const task = document.getElementById(id);
  task.parentNode.removeChild(task);
};

todaysDate();
checkNoTasks();

addingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteAlerts(); 
  const inputField = addingForm.querySelector('#addNewTask');
  const content = inputField.value;
  const newTask = createTaskTemplate(content);
  addNewTask(newTask);
  inputField.value = '';
  insertAlert('added');
  setTimeout(() => {
    deleteAlerts()
  }, DELAY);
});

tasksList.addEventListener('click', (evt) => {
  const element = evt.target;
  deleteAlerts();
  if (element.getAttribute('data-action') === 'delete-task') {
    const id = element.parentElement.id;
    deleteTask(id);
    insertAlert('deleted');
    setTimeout(() => {
      deleteAlerts();
      checkNoTasks();
    }, DELAY);
  }
});