import { taskSortingTmpl } from './taskSorting_tmpl.js';
import { TaskStorage } from '../../logic/TaskStorage.js';
import { TaskSorter } from '../../logic/TaskSorter.js';
import { initTaskCards } from '../../utils/initTaskCards.js';

export class TaskSorterGroup {
  constructor(taskContainer, taskSorter) {
    this.taskContainer = taskContainer;
    this.taskSorter = taskSorter;
    this.sorterGroup = null;
  }

  init() {
    const group = document.createElement('div');
    group.innerHTML = taskSortingTmpl;
    group.classList.add('sort-option__group');

    this.sorterGroup = group;
    return group;
  }

  addListeners() {
    const sortSelect = this.sorterGroup.querySelector('.task-sort');
    const filterSelect = this.sorterGroup.querySelector('.task-filter');
    const searchBar = this.sorterGroup.querySelector('.task-search-bar');
    const deleteCompleted = this.sorterGroup.querySelector('.delete-task--completed');
    const deleteExpired = this.sorterGroup.querySelector('.delete-task--expired');

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
      sortResultHasTasks(sorted, this.taskContainer);
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

      sortResultHasTasks(sorted, this.taskContainer);
    });

    // SECTION search bar
    searchBar.addEventListener('input', () => {
      const foundedTask = this.taskSorter.search(searchBar.value);
      sortResultHasTasks(foundedTask, this.taskContainer);
    });

    // SECTION delete
    deleteCompleted.addEventListener('click', () => {
      removeUnnecesaryTasks('.task-card--completed', this.taskContainer);
    });

    deleteExpired.addEventListener('click', () => {
      removeUnnecesaryTasks('.task-card--expired', this.taskContainer);
    });
  }
}

function removeUnnecesaryTasks(selector, taskContainer) {
  const unnecesaryTasks = taskContainer.querySelectorAll(selector);
  if (unnecesaryTasks.length) {
    unnecesaryTasks.forEach(tc => {
      const taskID = tc.getAttribute('data-taskID');
      TaskStorage.removeTask(taskID);
      tc.remove();
    });
  }
}

function sortResultHasTasks(sortResults, taskContainer) {
  if (sortResults.length) {
    initTaskCards(sortResults, taskContainer);
  } else {
    // TODO imagen de no resultados
    taskContainer.replaceChildren();
  }
}
