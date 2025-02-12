import { destroyDatePicker } from '../DatePicker/datePicker_handler.js';

import {
  addTaskSectionHTML,
  initAddTaskSection,
} from '../../_nav_sections/01_addTaskSection.js';

import {
  taskListSectionHTML,
  initTaskListSection,
} from '../../_nav_sections/02_taskListSection.js';

import {
  projectSectionHTML,
  initProjectSection,
} from '../../_nav_sections/03_projectSection.js';

export function sidebarHandler() {
  const handler = new SidebarHandler();
  handler.addListeners();
  handler.addCurrentNavStyle();
}

class SidebarHandler {
  $$NavButton = document.querySelectorAll('.nav-list__button');
  HTMLContent = [addTaskSectionHTML, taskListSectionHTML, projectSectionHTML];
  SectionInits = [initAddTaskSection, initTaskListSection, initProjectSection];
  currentNav = this.$$NavButton[0];

  addListeners() {
    const $Content = document.querySelector('#content');
    this.$$NavButton.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (this.currentNav !== btn) {
          this.currentNav = btn;
          destroyDatePicker();
          $Content.innerHTML = this.HTMLContent[index];
          this.SectionInits[index]();
          this.addCurrentNavStyle();
        }
      });
    });
  }

  addCurrentNavStyle() {
    this.$$NavButton.forEach(btn => {
      btn.classList.remove('nav-list__button--current');
    });
    this.currentNav.classList.add('nav-list__button--current');
  }
}
