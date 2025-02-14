import './styles.css';
import { projectFormTmpl } from '../ProjectForm/projectForm_tmpl.js';
import { taskFormTmpl } from '../TaskForm/taskForm_tmpl.js';

export const projectViewModalTmpl = `
<dialog class="project-view">
  <section class="project-view__project-data">
    <div class="project-view__group--main-data">
    ${projectFormTmpl}
    </div>
  </section>
  <section class="project-view__task-management">
  </section>
  <section class="project-view__add-task">
    <details class="project-view__form-details">
      <summary class="project-view__form-summary">Add a task</summary>
      <div class="project-view__task-form-container">
        ${taskFormTmpl}
      </div>
    </details>
  </section>
  <section class="project-view__tasks">
    <div class="project-view__task-container task-container">
      <!-- NOTE agregar una imagen para cuando esta vacio -->
      <!-- NOTE se colocan las task card -->
    </div>
  </section>
</dialog>
`;
