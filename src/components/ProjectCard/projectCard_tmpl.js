import './styles.css';
import taskSvg from '../../assets/svg/task.svg';
import editSvg from '../../assets/svg/edit.svg';
import trashSvg from '../../assets/svg/trash.svg';

import { projectViewModalTmpl } from '../ProjectViewModal/projectViewModal_tmpl.js';

export const projectCardTmpl = `
<div class="project-card__group--emoji">
  <h1 class="project-card__emoji"></h1>
</div>
<div class="project-card__group--main">
  <h2 class="project-card__name"></h2>
  <p class="project-card__description"></p>
</div>
<div class="project-card__group--tasks">
  <p class="project-card__tasks"></p>
  <img class="project-card__image" ${taskSvg}>
</div>
<div class="project-card__group--options">
  <button class="project-card__option--open" title="View">
    <img class="project-card__image" src=${editSvg} >
  </button>
  <button class="project-card__option--delete" title="Delete">
    <img class="project-card__image" ${trashSvg}>
  </button>
</div>
${projectViewModalTmpl}
`;
