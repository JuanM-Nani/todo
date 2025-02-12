import './styles.css';
import { ProjectStorage } from '../../logic/ProjectStorage.js';
// REVIEW importar la lista de proyectos

const forProjectTmpl = `
<select class ="task-form__project-select" name="for-project" id="for-project">
  <option class="task-form__project-option" value="" selected>No project</option>
</select>
`;

// NOTE lista provisional

export class ProjectSelect {
  HTMLContent = forProjectTmpl;
  constructor(form) {
    this.form = form;
  }

  init() {
    const projectList = ProjectStorage.show();
    if (projectList.length) {
      let $Select;

      if (this.form) $Select = this.form.querySelector('.task-form__project-select');
      else $Select = document.querySelector('.task-form__project-select');

      projectList.forEach(p => {
        const $Option = document.createElement('option');
        $Option.classList.add('task-form__project-option');
        $Option.textContent = p.name;
        $Option.value = p.projectID;
        $Select.appendChild($Option);
      });
    }
  }
}
