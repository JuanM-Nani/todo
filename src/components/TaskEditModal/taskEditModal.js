import './styles.css';
import { ProjectSelect } from '../ForProjectSelect/projectSelect_handler.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { destroyDatePicker } from '../DatePicker/datePicker_handler.js';
import { taskFormTmpl } from '../TaskForm/taskForm_tmpl.js';
import { TaskFormHandler } from '../TaskForm/taskForm_handler.js';
import { TaskCard } from '../TaskCard/TaskCard.js';
import { TaskCardHandler } from '../TaskCard/taskCard_handler.js';
import { parse } from 'date-fns';

const taskEditModalTmpl = `
<dialog class="edit-task">
    <h1 class="edit-task__title">Edit your task</h1>
    ${taskFormTmpl}
</dialog>
`;

class TaskEditModalHandler {
  constructor(task, card) {
    this.task = task;
    this.card = card;
    this.formHandler = null;
  }

  init() {
    const modal = this.card.querySelector('.edit-task');

    const title = modal.querySelector('.task-form__title');
    const description = modal.querySelector('.task-form__description');
    const form = modal.querySelector('.task-form');
    this.formHandler = new TaskFormHandler(form);
    this.formHandler.init();
    const flatpickrInstance = this.formHandler.datePicker.flatpickrInstance;

    if (!this.task.dueDate) {
      this.formHandler.datePicker.setMinDate(new Date());
    } else {
      const parsedDate = parse(this.task.dueDate, 'dd/MM/yyyy HH:mm', new Date());
      flatpickrInstance.setDate(parsedDate);
    }

    const priorityRadio = modal.querySelectorAll('.task-form__input--radio');
    const projectOptions = modal.querySelectorAll('.task-form__project-option');
    const projectSelect = new ProjectSelect(form);

    // Put the same values that the task has
    title.value = this.task.title;
    if (!this.task.description) {
      description.placeholder = 'No description';
    } else {
      description.value = this.task.description;
    }

    if (!this.task.dueDate) {
      const noDate = modal.querySelector('.task-form__no-due-date');
      noDate.checked = true;
    } else {
      const dueDateInput = modal.querySelector('.task-form #date-picker');
      dueDateInput.textContext = this.task.dueDate;
    }

    for (let i = 0; i < priorityRadio.length; i++) {
      const taskPriority = this.task.priority;
      const radioInput = priorityRadio[i];

      if (radioInput.value === taskPriority) radioInput.checked = true;
      else radioInput.checked = false;
    }

    for (let i = 0; i < projectOptions.length; i++) {
      const taskForProject = this.task.forProject;
      const projectOption = projectOptions[i];
      if (projectOption.value === taskForProject) projectOption.selected = true;
      else projectOption.selected = false;
    }
  }

  addListeners() {
    const modal = this.card.querySelector('.edit-task');
    const submit = modal.querySelector('.task-form__submit');
    submit.textContent = 'Save';

    submit.addEventListener('click', event => {
      const validity = this.formHandler.form.checkValidity();

      if (validity) {
        event.preventDefault();
        modal.close();
        destroyDatePicker();

        const formValues = this.formHandler.getValues();
        // swap task between projects
        const currentForProject = this.task.forProject;
        const newForProject = formValues[formValues.length - 1];
        verifyProjectChange(currentForProject, newForProject, this.task);

        const taskKeys = ['title', 'description', 'priority', 'dueDate', 'forProject'];
        formValues.forEach((value, index) => this.task.edit(taskKeys[index], value));

        const editedCard = replaceWithEditedCard(this.card, this.task);
        this.card = editedCard;
      }
    });
  }
}

function replaceWithEditedCard(currentCard, editedTask) {
  const taskCard = new TaskCard(editedTask);
  const editedCard = taskCard.initTaskCard();
  currentCard.replaceWith(editedCard);
  taskCard.initContent();
  taskCard.initMetaData();
  const taskCardHandler = new TaskCardHandler(taskCard);
  taskCardHandler.addListeners();

  return editedCard;
}

function verifyProjectChange(currentForProject, newForProject, task) {
  if (currentForProject !== newForProject) {
    const currentProject = ProjectStorage.getProjectByID(currentForProject);
    const newProject = ProjectStorage.getProjectByID(newForProject);

    if (currentForProject) currentProject.removeTask(task.taskID);
    if (newProject) newProject.addTask(task.taskID);
  }
}

export { TaskEditModalHandler, taskEditModalTmpl };
