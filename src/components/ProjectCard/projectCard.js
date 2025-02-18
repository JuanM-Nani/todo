import { ProjectViewModal } from '../ProjectViewModal/projectViewModal.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { TaskStorage } from '../../logic/TaskStorage.js';
import { projectCardTmpl } from './projectCard_tmpl.js';
import { nothingFoundedTmpl } from '../../utils/nothingFoundedTmpl.js';

export class ProjectCard {
  constructor(project) {
    this.project = project;
    this.card = null;
    this.modal = null;
  }

  init() {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.setAttribute('data-projectID', this.project.projectID);
    card.innerHTML = projectCardTmpl;

    this.card = card;
    return this.card;
  }

  initContent() {
    const emoji = this.card.querySelector('.project-card__emoji');
    const name = this.card.querySelector('.project-card__name');
    const description = this.card.querySelector('.project-card__description');
    const projectTasks = this.card.querySelector('.project-card__tasks');

    emoji.textContent = this.project.emoji;
    name.textContent = this.project.name;
    description.textContent = this.project.description || 'No description';

    const completedTasks = this.project.taskStorage.filter(taskID => {
      const task = TaskStorage.getTaskByID(taskID);
      if (task.isCompleted) return true;
    });

    projectTasks.textContent =
      completedTasks.length + '/' + this.project.taskStorage.length;
  }

  addListeners() {
    const openProjectView = this.card.querySelector('.project-card__option--open');
    const modal = this.card.querySelector('.project-view');

    openProjectView.addEventListener('click', () => {
      if (!this.modal) {
        this.modal = new ProjectViewModal(this.project, this.card);
        this.modal.init();
      }

      modal.showModal();
    });

    const deleteProject = this.card.querySelector('.project-card__option--delete');
    deleteProject.addEventListener('click', () => {
      this.card.id = 'delete';
      this.card.addEventListener('animationend', () => {
        this.card.remove();

        this.project.taskStorage.forEach(taskID => {
          TaskStorage.removeTask(taskID);
        });
        ProjectStorage.removeProject(this.project.projectID);

        const projectContainer = document.querySelector('.project-container');

        const emojiPicker = this.modal?.projectFormHandler.emojiPicker;
        if (emojiPicker) {
          emojiPicker.emojiButtonInstance.pickerEl.remove();
          emojiPicker.emojiButtonInstance.pickerContent.remove();
          emojiPicker.emojiButtonInstance.wrapper.remove();
          emojiPicker.emojiButtonInstance.off();
        }

        const datePicker = this.modal?.taskFormHandler.datePicker.flatpickrInstance;
        if (datePicker) datePicker.destroy();

        if (!projectContainer.children.length) {
          projectContainer.innerHTML = nothingFoundedTmpl;
        }
      });
    });
  }
}
