import { TaskCard } from '../components/TaskCard/TaskCard.js';
import { TaskCardHandler } from '../components/TaskCard/taskCard_handler.js';

export function initTaskCards(storage, container) {
  container.replaceChildren();
  storage.forEach(t => {
    const taskCard = new TaskCard(t);
    container.appendChild(taskCard.initTaskCard());
    taskCard.initContent();
    taskCard.initMetaData();
    const taskCardHandler = new TaskCardHandler(taskCard);
    taskCardHandler.addListeners();
  });
}
