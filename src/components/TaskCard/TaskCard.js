import './styles.css';
import { TaskCardTmpl } from './taskCard_tmpl.js';
import { addMetaData } from './taskCardMeta.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { setTaskExpired } from '../../utils/setTaskExpired.js';
import { isExpired } from '../../utils/isExpired.js';

const priorityColors = {
  1: 'lime',
  2: '#ffa100',
  3: 'red',
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
      this.$TaskCard.classList.add('task-card--completed');
    }

    this.$TaskCard = $Card;
    return $Card;
  }

  initContent() {
    this.$TaskCard.style.borderColor = priorityColors[this.task.priority];

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

    // TODO terminar
    /* if (this.task.subtasks.length) {
      let subtasks = 3;
      addMetaData('subtask', subtasks);
    } */
  }
}
