import { TaskCard } from '../components/TaskCard/TaskCard.js';
import { TaskCardHandler } from '../components/TaskCard/taskCard_handler.js';
import { nothingFoundedTmpl } from './nothingFoundedTmpl.js';

export function initTaskCards(storage, container, project) {
  if (storage.length) {
    storage.forEach(t => {
      if (t) {
        const taskCard = new TaskCard(t);
        container.appendChild(taskCard.initTaskCard());
        taskCard.initContent();

        const taskCardHandler = new TaskCardHandler(taskCard);
        if (project) {
          taskCardHandler.addListeners(true);
        } else {
          taskCard.initMetaData();
          taskCardHandler.addListeners();
        }
      }
    });
  } else {
    container.innerHTML = nothingFoundedTmpl
  }
}
