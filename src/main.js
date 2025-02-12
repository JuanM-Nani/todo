import './css/custom.css';
import './css/fonts.css';
import './css/global.css';
import './css/reset.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

import { TaskStorage } from './logic/TaskStorage.js';
import { isExpired } from './utils/isExpired.js';
import { setTaskExpired } from './utils/setTaskExpired.js';
import { sidebarTemplate } from './components/Sidebar/sidebar_tmpl.js';
import { sidebarHandler } from './components/Sidebar/sidebar_handler.js';

import {
  addTaskSectionHTML,
  initAddTaskSection,
} from './_nav_sections/01_addTaskSection.js';

const $Body = document.querySelector('body');
$Body.innerHTML = sidebarTemplate;
const main = document.createElement('main');
main.id = 'content';
$Body.appendChild(main);
main.innerHTML = addTaskSectionHTML;

// <>---------------------------<>
sidebarHandler();
initAddTaskSection();

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
