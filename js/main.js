const EMPTY_ALERT = 'На сегодня нет ни одной задачи!';
const ADDED_ALERT = 'Задача добавлена!';
const DELETED_ALERT = 'Задача удалена!';
const DELAY = 2000;

const addingForm = document.querySelector('#new-task-form');
const tasksContainer = document.querySelector('.tasks-container');
const tasksList = document.querySelector('#tasks-list');
const datePlace = document.querySelector('.subtitle');
const counterPlace = document.querySelector('.counter');
const inputField = document.querySelector('#add-new-task');

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const todaysDate = () => {
  const today = new Date();
  const formatted = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
  datePlace.insertAdjacentHTML('beforeend', `, ${formatted}`);
};

const countTasks = (tasks) => {
  const sum = tasks.length;
  counterPlace.innerHTML = ``;
  if (sum > 0) {
    counterPlace.innerHTML = sum;
  } else {
    counterPlace.innerHTML = 0;
  }
};

const makeDeleteButton = () => {
  return (
    `<button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>`
  );
};

const createNewTask = (content) => {
  const id = getRandomNumber(0, 1000);
  return {
    content,
    id
  };
};

const createTaskTemplate = (task) => {
  const deleteButton = makeDeleteButton();
  return (
    `<li class="list-group-item d-flex justify-content-between" id="task${task.id}">
      <span class="task-title" contenteditable="true">${task.content}</span>
      ${deleteButton}
    </li>`
  );
};

const insertNewTask = (task) => {
  tasksList.insertAdjacentHTML('afterbegin', task);
};

const renderAllTasks = (tasks) => {
  tasksList.innerHTML = ``;
  tasks.forEach((item) => {
    const taskMarkup = createTaskTemplate(item);
    insertNewTask(taskMarkup);
  });
};
  
const deleteTaskFromTasks = (id) => {
  const numeralId = parseInt(id.slice(4), 10);
  const newTasks = tasks.filter((item) => item.id !== numeralId);
  updateData(newTasks);
  tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks;
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

const checkTasks = (tasks) => {
  if (tasks.length === 0) {
    insertAlert('empty');
  }
};

const updateData = (newData) => {
  localStorage.clear();
  localStorage.setItem('tasks', JSON.stringify(newData));
  return localStorage;
};

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderAllTasks(tasks);
  checkTasks(tasks);
}

todaysDate();
countTasks(tasks);

addingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteAlerts();
  const content = inputField.value;
  const newTask = createNewTask(content);
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const newTaskMarkup = createTaskTemplate(newTask);
  renderAllTasks(tasks);
  countTasks(tasks);
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
    tasks = deleteTaskFromTasks(id);
    renderAllTasks(tasks);
    countTasks(tasks);
    insertAlert('deleted');
    setTimeout(() => {
      deleteAlerts();
      checkTasks(tasks);
    }, DELAY);
  }
});