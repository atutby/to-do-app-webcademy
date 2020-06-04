const addingForm = document.querySelector('#new-task-form');
const tasksList = document.querySelector('#tasks-list');
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
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
    `<li class="list-group-item d-flex justify-content-between" id="${id}">
    <span class="task-title">${content}</span>
    ${deleteButton}
    </li>`
  );
};
const addNewTask = (task) => {
  tasksList.insertAdjacentHTML('afterbegin', task);
};
const findTaskById = (id, list) => {
  return list.filter((item) => item.id === id);
};
const deleteTask = (id) => {
  const allTasks = tasksList.querySelectorAll('list-group-item');
  const task = findTaskById(allTasks, id);
  console.log(task);
};

addingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const inputField = addingForm.querySelector('#addNewTask');
  const content = inputField.value;
  const newTask = createTaskTemplate(content);
  addNewTask(newTask);
  inputField.value = '';
});
