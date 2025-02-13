import { ProjectCard } from '../components/ProjectCard/projectCard.js';

export function createProjectCard(project) {
  const card = new ProjectCard(project);
  card.init();
  card.initContent();
  card.addListeners();
}
