import { DatePickerHandler } from '../DatePicker/datePicker_handler.js';
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
    const datePickerInput = this.form.querySelector('#due-date');
    this.datePicker = new DatePickerHandler(datePickerInput);
    this.datePicker.init(datePickerInput);
    this.datePicker.setMinDate(new Date());
    const projectSelect = new ProjectSelect(this.form);

    setTimeout(() => {
      projectSelect.init();
    }, 0);
  }

  getValues(project) {
    const title = this.form.querySelector('.task-form__title').value;
    const description = this.form.querySelector('.task-form__description').value;
    const priority = this.form.querySelector('.task-form__input--radio:checked').value;
    const dueDatePick = this.form.querySelector('#due-date').value;
    const noDueDate = this.form.querySelector('.task-form__no-due-date').checked;
    const dueDate = noDueDate ? null : dueDatePick;

    const $ProjectSelect = this.form.querySelector('.task-form__project-select');
    let selectedOption = null;
    let forProject = null;

    if ($ProjectSelect)
      selectedOption = $ProjectSelect.options[$ProjectSelect.selectedIndex].value;

    if (project) forProject = project;
    else forProject = selectedOption === '' ? null : selectedOption;

    return [title, description, priority, dueDate, forProject];
  }

  addListeners(projectTaskContainer, project) {
    const $SubmitBtn = this.form.querySelector('.task-form__submit');
    const $NoDueDate = this.form.querySelector('#no-due-date');
    const $DatePicker = this.form.querySelector('#due-date');

    $NoDueDate.addEventListener('change', () => {
      $DatePicker.disabled = !$DatePicker.disabled;
    });

    $SubmitBtn.addEventListener('click', event => {
      const validity = this.form.checkValidity();
      const values = this.getValues(project);

      if (validity) {
        event.preventDefault();

        const task = createTask(values);
        this.form.reset();
        this.datePicker.setMinDate(new Date());
        $DatePicker.disabled = false;

        if (projectTaskContainer) {
          const nothingFound = projectTaskContainer.querySelector('.nothing-founded');
          nothingFound?.remove();

          import('../TaskCard/TaskCard.js').then(({ TaskCard }) => {
            const taskCard = new TaskCard(task);
            projectTaskContainer.appendChild(taskCard.initTaskCard());
            taskCard.initContent();

            import('../TaskCard/taskCard_handler.js').then(({ TaskCardHandler }) => {
              const taskCardHandler = new TaskCardHandler(taskCard);
              taskCardHandler.addListeners(true);
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
