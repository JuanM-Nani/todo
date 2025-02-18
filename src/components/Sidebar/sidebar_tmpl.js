import './styles.css';
import addSvg from '../../assets/svg/add.svg';
import taskSvg from '../../assets/svg/task.svg';
import projectSvg from '../../assets/svg/project.svg';

export const sidebarTemplate = `
<aside class="nav-sidebar">
  <ul class="nav-list">
    <li class="nav-list__item">
      <button class="nav-list__button nav-list__button--add-task">
        <span class="nav-list__span">
          <img class="nav-list__image" src=${addSvg}  alt="add-icon" />
          Add task
        </span>
      </button>
    </li>
    <li class="nav-list__item">
      <button class="nav-list__button nav-list__button--tasks">
        <span class="nav-list__span">
          <img class="nav-list__image" src=${taskSvg} alt="task-icon" />
          Task list
        </span>
      </button>
    </li>
    <li class="nav-list__item">
      <button class="nav-list__button nav-list__button--project">
        <span class="nav-list__span">
          <img class="nav-list__image" src=${projectSvg} alt="project-icon" />
          Project
        </span>
      </button>
    </li>
  </ul>
</aside>
`;
