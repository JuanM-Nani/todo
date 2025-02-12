import projectSVG from '../../assets/svg/project.svg';
import subtaskSVG from '../../assets/svg/subtask.svg';

const meta = {
  project: {
    selector: '.task-card__project',
    src: projectSVG,
    alt: 'project',
    title: 'Project',
  },
  subtask: {
    selector: '.task-card__subtask',
    src: subtaskSVG,
    alt: 'subtask',
    title: 'Subtask',
  },
};

export function addMetaData(type, text, card) {
  const span = card.querySelector(meta[type].selector);
  const img = document.createElement('img');
  img.src = meta[type].src;
  img.alt = meta[type].alt;
  img.title = meta[type].title;

  span.textContent = text;
  span.appendChild(img);
}
