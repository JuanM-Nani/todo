import { projectViewModalTmpl } from '../ProjectViewModal/projectViewModal_tmpl.js';
import { ProjectViewModal } from '../ProjectViewModal/projectViewModal.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { TaskStorage } from '../../logic/TaskStorage.js';

const projectCardTmpl = `
<h1 class="project-card__emoji"></h1>
  <div class="project-card__group--main">
    <h2 class="project-card__name"></h2>
    <p class="project-card__description"></p>
    <p class="project-card__tasks"></p>
  </div>
<button class="project-card__option--open">Open</button>
<button class="project-card__option--delete">Delete</button>
${projectViewModalTmpl}
`;
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
    this.modal = new ProjectViewModal(this.project, this.card);
    this.modal.init();

    const emoji = this.card.querySelector('.project-card__emoji');
    const name = this.card.querySelector('.project-card__name');
    const description = this.card.querySelector('.project-card__description');
    const projectTasks = this.card.querySelector('.project-card__tasks');

    emoji.textContent = this.project.emoji;
    name.textContent = this.project.name;
    description.textContent = this.project.description || 'No description';
    projectTasks.textContent = this.project.taskStorage.length;
  }

  addListeners() {
    const openProjectView = this.card.querySelector('.project-card__option--open');
    const modal = this.card.querySelector('.project-view');

    openProjectView.addEventListener('click', () => {
      modal.show();
    });

    const deleteProject = this.card.querySelector('.project-card__option--delete');
    deleteProject.addEventListener('click', () => {
      this.card.remove();

      this.project.taskStorage.forEach(taskID => {
        TaskStorage.removeTask(taskID);
      });
      ProjectStorage.removeProject(this.project.projectID);
    });
  }
}
