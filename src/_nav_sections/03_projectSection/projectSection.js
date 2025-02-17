import './styles.css'
import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { ProjectFormHandler } from '../../components/ProjectForm/projectForm_handler.js';
import { projectFormTmpl } from '../../components/ProjectForm/projectForm_tmpl.js';
import { ProjectCard } from '../../components/ProjectCard/projectCard.js';
import { nothingFoundedTmpl } from '../../utils/nothingFoundedTmpl.js';

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

  const $ProjectContainer = document.querySelector('.project-container');
  if (projects.length) {
    projects.forEach(p => {
      const projecCard = new ProjectCard(p);
      const card = projecCard.init();
      $ProjectContainer.appendChild(card);
      projecCard.initContent();
      projecCard.addListeners();
    });
  } else {
    $ProjectContainer.innerHTML = nothingFoundedTmpl;
  }
}

export { projectSectionHTML, initProjectSection };
