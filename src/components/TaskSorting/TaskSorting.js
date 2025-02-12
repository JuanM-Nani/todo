import { taskSortingTmpl } from './taskSorting_tmpl.js';
import { TaskStorage } from '../../logic/TaskStorage.js';
import { TaskSorter } from '../../logic/TaskSorter.js';
import { initTaskCards } from '../../utils/initTaskCards.js';

export class TaskSorterGroup {
  constructor() {
    this.sorterGroup = null;
    this.taskSorter = null;
  }

  init(project) {
    const group = document.createElement('div');
    group.innerHTML = taskSortingTmpl;
    group.classList.add('sort-option__group');

    let taskSorter = null;
    if (project) {
      group.setAttribute('data-storage', project.projectID);
      taskSorter = new TaskSorter(project.taskStorage);
    } else {
      const tasks = TaskStorage.show();
      taskSorter = new TaskSorter(Array.from(tasks.values()));
    }

    this.sorterGroup = group;
    this.taskSorter = taskSorter;
  }

  addListeners() {
    const sortSelect = this.sorterGroup.querySelector('.task-sort');
    const filterSelect = this.sorterGroup.querySelector('.task-filter');
    const searchBar = this.sorterGroup.querySelector('.task-search-bar');

    // SECTION - sort select
    sortSelect.addEventListener('change', () => {
      const sortMethod = sortSelect.options[sortSelect.selectedIndex].value;
      const sortCondition =
        sortSelect.options[sortSelect.selectedIndex].getAttribute('data-condition');

      // Set the current sort method
      this.taskSorter.currentSort = sortMethod;
      this.taskSorter.currentSortCondition = sortCondition;

      const filterMethod = this.taskSorter._currentFilter;
      const filterCondition = this.taskSorter._currentFilterCondition;
      const filteredStorage = this.taskSorter.filter(filterMethod, filterCondition);

      const sorted = this.taskSorter.sort(sortMethod, sortCondition, filteredStorage);
      sortResultHasTasks(sorted, section);
    });

    // SECTION - filter select
    filterSelect.addEventListener('change', () => {
      const filterMethod = filterSelect.options[filterSelect.selectedIndex].value;
      const filterCondition =
        filterSelect.options[filterSelect.selectedIndex].getAttribute('data-condition');

      // Set the current filter method
      this.taskSorter.currentFilter = filterMethod;
      this.taskSorter.currentFilterCondition = filterCondition;

      const filteredStorage = this.taskSorter.filter(filterMethod, filterCondition);

      const sortMethod = this.taskSorter._currentSort;
      const sortCondition = this.taskSorter._currentSortCondition;
      const sorted = this.taskSorter.sort(sortMethod, sortCondition, filteredStorage);

      const section = this.sorterGroup.parentElement;
      sortResultHasTasks(sorted, section);
    });

    searchBar.addEventListener('input', () => {
      const foundedTask = this.taskSorter.search(searchBar.value);
      const section = this.sorterGroup.parentElement;
      sortResultHasTasks(foundedTask, section);
    });
  }
}

function sortResultHasTasks(sortResults, section) {
  const taskContainer =
    section.nextElementSibling.querySelector('.task-container') ||
    document.querySelector('.task-container');

  if (sortResults.length) {
    initTaskCards(sortResults, taskContainer);
  } else {
    // TODO imagen de no resultados
    taskContainer.replaceChildren();
    console.log('agregar imagen');
  }
}
