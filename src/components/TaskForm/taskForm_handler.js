import {
  DatePickerHandler,
  destroyDatePicker,
} from '../DatePicker/datePicker_handler.js';
import { ProjectSelect } from '../ForProjectSelect/projectSelect_handler.js';
import { Task } from '../../logic/Task.js';
import { TaskStorage } from '../../logic/TaskStorage.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';

const projectSelect = new ProjectSelect();
const projectSelectHTML = projectSelect.HTMLContent;

class TaskFormHandler {
  constructor(form) {
    this.form = form;
    this.datePicker = null;
  }

  init() {
    destroyDatePicker();
    const datePickerInput = this.form.querySelector('#date-picker');
    this.datePicker = new DatePickerHandler(datePickerInput);
    this.datePicker.init(datePickerInput);
    this.datePicker.setMinDate(new Date());
    projectSelect.init();

    const emojiPickerDiv = document.querySelector('.emoji-picker__wrapper');
    if (emojiPickerDiv) emojiPickerDiv.remove();
  }

  getValues() {
    const title = this.form.querySelector('.task-form__title').value;
    const description = this.form.querySelector('.task-form__description').value;
    const priority = this.form.querySelector('.task-form__input--radio:checked').value;
    const dueDatePick = this.form.querySelector('#date-picker').value;
    const noDueDate = this.form.querySelector('.task-form__no-due-date').checked;
    const dueDate = noDueDate ? null : dueDatePick;
    const $ProjectSelect = this.form.querySelector('.task-form__project-select');
    const selectedOption = $ProjectSelect.options[$ProjectSelect.selectedIndex].value;
    const forProject = selectedOption === '' ? null : selectedOption;

    return [title, description, priority, dueDate, forProject];
  }

  addListeners(projectTaskContainer) {
    const $SubmitBtn = this.form.querySelector('.task-form__submit');
    $SubmitBtn.addEventListener('click', event => {
      const validity = this.form.checkValidity();
      if (validity) {
        event.preventDefault();
        const task = createTask(this.getValues());
        console.log(task);
        this.form.reset();
        this.datePicker.setMinDate(new Date());

        if (projectTaskContainer) {
          import('../TaskCard/TaskCard.js').then(({ TaskCard }) => {
            const taskCard = new TaskCard(task);
            console.log(taskCard);
            projectTaskContainer.appendChild(taskCard.initTaskCard());
            taskCard.initContent();
            taskCard.initContent();

            import('../TaskCard/taskCard_handler.js').then(({ TaskCardHandler }) => {
              const taskCardHandler = new TaskCardHandler(taskCard);
              taskCardHandler.addListeners();
            });
          });
        }
      }
    });
  }
}

function createTask(values) {
  const task = new Task(...values);
  if (task.forProject) addTaskToProject(task.forProject, task.taskID);
  TaskStorage.addTask(task);
  return task;
  // task.forProject is a randomUUID
}

function addTaskToProject(projectID, taskID) {
  const project = ProjectStorage.getProjectByID(projectID);
  project.addTask(taskID);
}

export { projectSelectHTML, TaskFormHandler };
