import { ProjectFormHandler } from '../ProjectForm/projectForm_handler';

export class ProjectViewModal {
  constructor(project, card) {
    this.project = project;
    this.card = card;
  }

  init() {
    const form = this.card.querySelector('.project-form');
    const formHandler = new ProjectFormHandler(form);
    // INICIAMOS UN FORM
  }
}
