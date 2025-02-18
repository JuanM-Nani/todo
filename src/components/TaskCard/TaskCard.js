import { TaskCardTmpl } from './taskCard_tmpl.js';
import { addMetaData } from './taskCardMeta.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { setTaskExpired } from '../../utils/setTaskExpired.js';
import { isExpired } from '../../utils/isExpired.js';

const priorityColors = {
  1: 'lime',
  bg1: '#00ff0023',
  2: 'yellow',
  bg2: '#ffee0041',
  3: 'red',
  bg3: '#ff000041',
};

export class TaskCard {
  constructor(task) {
    this.task = task;
    this.HTMLContent = TaskCardTmpl;
    this.$TaskCard = null;
  }

  initTaskCard() {
    const $Card = document.createElement('div');
    $Card.classList.add('task-card');
    $Card.innerHTML = this.HTMLContent;
    $Card.setAttribute('data-taskID', this.task.taskID);

    if (isExpired(this.task)) {
      setTaskExpired($Card, this.task);
    } else if (this.task.isCompleted) {
      $Card.classList.add('task-card--completed');
    }

    this.$TaskCard = $Card;
    return $Card;
  }

  initContent() {
    const modal = this.$TaskCard.querySelector('.edit-task');
    const taskBorderColor = priorityColors[this.task.priority];
    const taskBackGroundColor = priorityColors[`bg${this.task.priority}`];

    this.$TaskCard.style.borderColor = taskBorderColor;
    this.$TaskCard.style.backgroundColor = taskBackGroundColor;
    modal.style.borderColor = taskBorderColor;

    const $Title = this.$TaskCard.querySelector('.task-card__title');
    const $Description = this.$TaskCard.querySelector('.task-card__description');
    const $DueDate = this.$TaskCard.querySelector('.task-card__due-date');

    $Title.textContent = this.task.title;
    $Description.textContent = this.task.description || 'No description';
    $DueDate.textContent = this.task.dueDate || 'No due date';
  }

  initMetaData() {
    if (this.task.forProject) {
      const project = ProjectStorage.getProjectByID(this.task.forProject);
      const projectName = project.name;
      addMetaData('project', projectName, this.$TaskCard);
    }
  }
}
