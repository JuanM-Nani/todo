import { ProjectStorage } from '../logic/ProjectStorage.js';
import { createProjectCard } from '../utils/createProjectCard.js';
import { ProjectFormHandler } from '../components/ProjectForm/projectForm_handler.js';
import { projectFormTmpl } from '../components/ProjectForm/projectForm_tmpl.js';

const projectSectionHTML = `
<section class="projects">
  <header class="projects__header">
    ${projectFormTmpl}
  </header>
  <div class="project-container"></div>
</section>
`;

function initProjectSection() {
  const form = document.querySelector('.project-form');
  const formHandler = new ProjectFormHandler(form);
  formHandler.init();
  formHandler.addListeners();
  initProjectCards();
}

function initProjectCards() {
  const projects = ProjectStorage.show();
  projects.forEach(p => {
    createProjectCard(p);
  });
}

export { projectSectionHTML, initProjectSection };
