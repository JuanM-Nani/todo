import { TaskCard } from '../../components/TaskCard/TaskCard.js';
import { TaskCardHandler } from '../../components/TaskCard/taskCard_handler.js';
import { TaskStorage } from '../../logic/TaskStorage.js';
import { TaskSorterGroup } from '../../components/TaskSorting/TaskSorting.js';
import { TaskSorter } from '../../logic/TaskSorter.js';
import { nothingFoundedTmpl } from '../../utils/nothingFoundedTmpl.js';

const taskListSectionHTML = `
<section class="task-list">
  <header class="task-list__sorting">
  </header>
  <div class="task-container"></div>
</section>
`;

function initTaskListSection() {
  const taskContainer = document.querySelector('.task-container');
  const tasks = TaskStorage.show();
  const taskStorage = Array.from(tasks.values());
  const taskSorterGroup = new TaskSorterGroup(taskContainer, new TaskSorter(taskStorage));
  taskSorterGroup.init();

  const header = document.querySelector('.task-list__sorting');
  header.appendChild(taskSorterGroup.sorterGroup);
  taskSorterGroup.addListeners();
  initTaskListCards();

  const emojiPickerDivs = document.querySelectorAll('.emoji-picker__wrapper');
  emojiPickerDivs.forEach(picker => {
    picker?.remove();
  });
  const $$EmojiWrapper = document.querySelectorAll('.emoji-picker__wrapper');
  $$EmojiWrapper.forEach(element => element?.remove);
}

function initTaskListCards() {
  const tasks = TaskStorage.show();
  const $CardContainer = document.querySelector('.task-container');

  if (tasks.size) {
    // NOTE size for map instance
    tasks.forEach(t => {
      const taskCard = new TaskCard(t);
      $CardContainer.appendChild(taskCard.initTaskCard());
      taskCard.initContent();
      taskCard.initMetaData();
      const taskCardHandler = new TaskCardHandler(taskCard);
      taskCardHandler.addListeners();
    });
  } else {
    $CardContainer.innerHTML = nothingFoundedTmpl;
  }
}

// REVIEW

export { taskListSectionHTML, initTaskListSection };
