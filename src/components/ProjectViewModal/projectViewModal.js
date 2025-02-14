import { ProjectFormHandler } from '../ProjectForm/projectForm_handler.js';
import { TaskFormHandler } from '../TaskForm/taskForm_handler.js';
import { TaskSorterGroup } from '../TaskSorting/TaskSorting.js';
import { initTaskCards } from '../../utils/initTaskCards.js';
import { TaskStorage } from '../../logic/TaskStorage';
import { TaskSorter } from '../../logic/TaskSorter.js';

export class ProjectViewModal {
  constructor(project, card) {
    this.project = project;
    this.card = card;
    this.projectFormHandler = null;
    this.taskFormHandler = null;
    this.taskSorterGroup = null;
    this.taskContainer = null;
  }

  init() {
    this.taskContainer = this.card.querySelector('.task-container');
    const mappedTaskStorage = this.project.taskStorage.map(taskID => {
      return TaskStorage.getTaskByID(taskID);
    });

    initTaskCards(mappedTaskStorage, this.taskContainer);

    const projectForm = this.card.querySelector('.project-form');
    const submitProject = this.card.querySelector('.project-form__submit');
    submitProject.innerHTML = `<img src="./src/assets/svg/trash.svg" alt="">`;
    submitProject.classList.add('project-view__close');

    this.projectFormHandler = new ProjectFormHandler(projectForm);
    this.projectFormHandler.init();
    this.projectFormHandler.addListeners(true);

    const emojiPickerInstance = this.projectFormHandler.emojiPicker;
    const projectName = projectForm.querySelector('.project-form__name');
    const description = projectForm.querySelector('.project-form__description');

    emojiPickerInstance.selection = this.project.emoji;
    projectName.value = this.project.name;
    if (this.project.description) {
      description.value = this.project.description;
    } else {
      description.placeholder = 'No description';
    }

    this.taskSorterGroup = new TaskSorterGroup(
      this.taskContainer,
      new TaskSorter(mappedTaskStorage)
    );

    const taskManagement = this.card.querySelector('.project-view__task-management');
    taskManagement.appendChild(this.taskSorterGroup.init());
    this.taskSorterGroup.addListeners();

    const taskForm = this.card.querySelector('.task-form');
    this.taskFormHandler = new TaskFormHandler(taskForm);
    this.taskFormHandler.init();
    this.taskFormHandler.addListeners(this.taskContainer);
  }
}
