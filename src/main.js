import './css/custom.css';
import './css/fonts.css';
import './css/global.css';
import './css/reset.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

import { TaskStorage } from './logic/TaskStorage.js';
import { ProjectStorage } from './logic/ProjectStorage.js';
import { isExpired } from './utils/isExpired.js';
import { setTaskExpired } from './utils/setTaskExpired.js';
import { sidebarTemplate } from './components/Sidebar/sidebar_tmpl.js';
import { SidebarHandler } from './components/Sidebar/sidebar_handler.js';

import {
  addTaskSectionHTML,
  initAddTaskSection,
} from './_nav_sections/01_addTaskSection/addTaskSection.js';

// SECTION localStorage

// ANCHOR get
window.addEventListener('load', () => {
  const localTaskStorage = localStorage.getItem('taskStorage');
  const localProjectStorage = localStorage.getItem('projectStorage');

  if (localTaskStorage && localProjectStorage) {
    const parsedTaskStorage = new Map(JSON.parse(localTaskStorage));
    const parsedProjectStorage = JSON.parse(localProjectStorage);

    TaskStorage.setLocalTaskStorage(parsedTaskStorage);
    ProjectStorage.setLocalProjectStorage(parsedProjectStorage);
  }
});

// ANCHOR set
window.addEventListener('beforeunload', () => {
  const tasks = TaskStorage.show();
  const projects = ProjectStorage.show();

  const stringifiedTaskStorage = JSON.stringify(Array.from(tasks));
  const stringifiedProjectStorage = JSON.stringify(projects);

  localStorage.setItem('taskStorage', stringifiedTaskStorage);
  localStorage.setItem('projectStorage', stringifiedProjectStorage);
});

// SECTION first loading
const $Body = document.querySelector('body');
$Body.innerHTML += sidebarTemplate;
const main = document.createElement('main');
main.id = 'content';
$Body.appendChild(main);

const currentNav = sessionStorage.getItem('currentNav');
const sidebarHandler = new SidebarHandler();

if (currentNav) {
  window.addEventListener('load', () => {
    sidebarHandler.init();
    sidebarHandler.addListeners();
    sidebarHandler.addCurrentNavStyle();
  });
} else {
  main.innerHTML = addTaskSectionHTML;
  initAddTaskSection();
  sidebarHandler.addListeners();
  sidebarHandler.addCurrentNavStyle();
}

// NOTE to set expired task card styles
setInterval(() => {
  const $$TaskCard = document.querySelectorAll('.task-card');
  if ($$TaskCard.length) {
    $$TaskCard.forEach(tc => {
      const taskID = tc.getAttribute('data-taskID');
      const task = TaskStorage.getTaskByID(taskID);

      if (isExpired(task)) {
        setTaskExpired(tc, task);
      }
    });
  }
}, 1000 * 60);
