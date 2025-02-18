import './styles.css';
import { taskEditModalTmpl } from '../TaskEditModal/taskEditModal.js';
import markCompleteSvg from '../../assets/svg/mark_complete.svg';
import editSvg from '../../assets/svg/edit.svg';
import trashSvg from '../../assets/svg/trash.svg';

export const TaskCardTmpl = `
  <div class="task-card__group--content">
    <h2 class="task-card__title"></h2>
    <p class="task-card__description"></p>
    <p class="task-card__due-date"></p>
  </div>
  <div class="task-card__group--meta">
    <span class="task-card__meta-data task-card__project"></span>
    <span class="task-card__meta-data task-card__subtask"></span>
  </div>
  <aside class="task-card__group--options">
    <button class="task-card__option--mark-complete" title="Change status">
      <img src=${markCompleteSvg} alt="mark-complete" />
    </button>
    <button class="task-card__option--edit" title="Edit task">
      <img src=${editSvg} alt="edit" />
    </button>
    <button class="task-card__option--delete" title="Delete task">
      <img src=${trashSvg} alt="delete" />
    </button>
  </aside>
  ${taskEditModalTmpl}
`;
