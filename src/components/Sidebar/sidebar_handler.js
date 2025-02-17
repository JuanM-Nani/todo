import {
  addTaskSectionHTML,
  initAddTaskSection,
} from '../../_nav_sections/01_addTaskSection/addTaskSection.js';

import {
  taskListSectionHTML,
  initTaskListSection,
} from '../../_nav_sections/02_taskListSection/taskListSection.js';

import {
  projectSectionHTML,
  initProjectSection,
} from '../../_nav_sections/03_projectSection/projectSection.js';

export class SidebarHandler {
  constructor() {
    this.$$NavButton = document.querySelectorAll('.nav-list__button');
    this.HTMLContent = [addTaskSectionHTML, taskListSectionHTML, projectSectionHTML];
    this.SectionInits = [initAddTaskSection, initTaskListSection, initProjectSection];
    this.currentNav = this.$$NavButton[0];
  }

  init() {
    const currentNav = sessionStorage.getItem('currentNav');
    const $Content = document.querySelector('#content');
    this.currentNav = this.$$NavButton[currentNav];

    const sectionContent = this.HTMLContent[currentNav];
    const sectionInit = this.SectionInits[currentNav];
    $Content.innerHTML = sectionContent;
    sectionInit();

    this.addListeners();
  }

  addListeners() {
    const $Content = document.querySelector('#content');

    this.$$NavButton.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (index) {
          const datePickers = document.querySelectorAll('.flatpickr-calendar');
          datePickers.forEach(datePicker => datePicker?.remove());
        }

        if (this.currentNav !== btn) {
          const currentSessionNav = sessionStorage.setItem('currentNav', index);
          this.currentNav = btn;

          const sectionContent = this.HTMLContent[index];
          const sectionInit = this.SectionInits[index];

          $Content.innerHTML = sectionContent;
          sectionInit();

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
