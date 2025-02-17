import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { TaskStorage } from '../../logic/TaskStorage.js';
import { nothingFoundedTmpl } from '../../utils/nothingFoundedTmpl.js';
import { TaskEditModalHandler } from '../TaskEditModal/taskEditModal.js';

export class TaskCardHandler {
  constructor(taskCard) {
    this.taskCard = taskCard;
  }

  addListeners() {
    taskCardOptions.forEach(option => {
      this.taskCard.$TaskCard.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains(option.elementClass)) {
          option.callback(this.taskCard.task, this.taskCard.$TaskCard);
        }
      });
    });
  }
}

const taskCardOptions = [
  {
    elementClass: 'task-card__option--mark-complete',
    callback: (task, card) => {
      card.classList.toggle('task-card--completed');
      task.isCompleted = !task.isCompleted;
    },
  },
  {
    elementClass: 'task-card__option--edit',
    callback: (task, card) => {
      const modalHandler = new TaskEditModalHandler(task, card);
      modalHandler.init();
      modalHandler.addListeners();

      const modal = card.querySelector('.edit-task');

      modal.showModal();
    },
  },
  {
    elementClass: 'task-card__option--delete',
    callback: (task, card) => {
      TaskStorage.removeTask(task.taskID);

      const taskContainer = card.closest('.task-container');
      card.remove();

      if (!taskContainer.hasChildNodes()) {
        taskContainer.innerHTML = nothingFoundedTmpl;
      }

      if (task.forProject) {
        const project = ProjectStorage.getProjectByID(task.forProject);
        project.removeTask(task.taskID);
      }
    },
  },
];
