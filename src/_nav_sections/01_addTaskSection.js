import { taskFormTmpl } from '../components/TaskForm/taskForm_tmpl.js';
import { TaskFormHandler } from '../components/TaskForm/taskForm_handler.js';

const addTaskSectionHTML = `
<section class="add-task">${taskFormTmpl}</section>
`;

function initAddTaskSection() {
  const form = document.querySelector('.task-form');
  const formHandler = new TaskFormHandler(form);
  formHandler.init();
  formHandler.addListeners();
}

export { addTaskSectionHTML, initAddTaskSection };
