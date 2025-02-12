import './styles.css';

export const sidebarTemplate = `
<aside class="nav-sidebar">
  <ul class="nav-list">
    <li class="nav-list__item">
      <button class="nav-list__button nav-list__button--add-task">
        <span class="nav-list__span">
          <img class="nav-list__image" src="./src/assets/svg/add.svg" alt="add-icon" />
          Add task
        </span>
      </button>
    </li>
    <li class="nav-list__item">
      <button class="nav-list__button nav-list__button--tasks">
        <span class="nav-list__span">
          <img class="nav-list__image" src="./src/assets/svg/task.svg" alt="task-icon" />
          Task list
        </span>
      </button>
    </li>
    <li class="nav-list__item">
      <button class="nav-list__button nav-list__button--project">
        <span class="nav-list__span">
          <img class="nav-list__image" src="./src/assets/svg/project.svg" alt="project-icon" />
          Project
        </span>
      </button>
    </li>
  </ul>
</aside>
`;
