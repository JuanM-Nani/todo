import { TaskCard } from '../components/TaskCard/TaskCard.js';
import { TaskCardHandler } from '../components/TaskCard/taskCard_handler.js';
import { TaskStorage } from '../logic/TaskStorage.js';
import { TaskSorterGroup } from '../components/TaskSorting/TaskSorting.js';

const taskListSectionHTML = `
<section class="task-list">
  <header class="task-list__sorting">
  </header>
  <div class="task-container"></div>
</section>
`;

const taskSorterGroup = new TaskSorterGroup();
function initTaskListSection() {
  taskSorterGroup.init();
  const header = document.querySelector('.task-list__sorting');
  header.appendChild(taskSorterGroup.sorterGroup);
  taskSorterGroup.addListeners();
  initTaskListCards();
  const emojiPickerDiv = document.querySelector('.emoji-picker__wrapper');
  if (emojiPickerDiv) emojiPickerDiv.remove();
}

function initTaskListCards() {
  const tasks = TaskStorage.show();
  const $CardContainer = document.querySelector('.task-container');

  tasks.forEach(t => {
    const taskCard = new TaskCard(t);
    $CardContainer.appendChild(taskCard.initTaskCard());
    taskCard.initContent();
    taskCard.initMetaData();
    const taskCardHandler = new TaskCardHandler(taskCard);
    taskCardHandler.addListeners();
  });
}

// REVIEW

export { taskListSectionHTML, initTaskListSection };
