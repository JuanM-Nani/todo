import { Project } from '../../logic/Project.js';
import { EmojiPicker } from '../EmojiPicker/emojiPicker.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';
import { ProjectCard } from '../ProjectCard/projectCard.js';

export class ProjectFormHandler {
  constructor(form) {
    this.form = form;
    this.emojiPicker = null;
  }

  init() {
    const triggerButton = this.form.querySelector('#emoji-picker');
    this.emojiPicker = new EmojiPicker(triggerButton);
    this.emojiPicker.init();
    this.emojiPicker.addListeners();
  }

  getValues() {
    const emoji = this.emojiPicker.selection;
    const name = this.form.querySelector('.project-form__name').value;
    const description = this.form.querySelector('.project-form__description').value;

    return [emoji, name, description];
  }

  addListeners(projectEdit) {
    const submitForm = this.form.querySelector('.project-form__submit');

    submitForm.addEventListener('click', event => {
      if (this.form.checkValidity()) {
        event.preventDefault();

        const values = this.getValues();
        if (projectEdit) {
          const modal = this.form.closest('.project-view');
          const currentCard = modal.closest('.project-card');
          const projectID = currentCard.getAttribute('data-projectID');
          const project = ProjectStorage.getProjectByID(projectID);

          const projectKeys = ['emoji', 'name', 'description'];
          values.forEach((value, index) => project.edit(projectKeys[index], value));
          replaceWithEditedCard(currentCard, project);

          modal.close();
        } else {
          createProject(values);
          this.form.reset();
          this.emojiPicker.selection = '📋';
          this.emojiPicker.triggerButton.innerHTML = '📋';
        }
      }
    });
  }
}

function replaceWithEditedCard(currentCard, editedProject) {
  const newProjectCard = new ProjectCard(editedProject);
  currentCard.replaceWith(newProjectCard.init());
  newProjectCard.initContent();
  newProjectCard.addListeners();
}

function createProject(values) {
  const $ProjectContainer = document.querySelector('.project-container');
  const project = new Project(...values);
  ProjectStorage.addProject(project);

  const projecCard = new ProjectCard(project);
  const card = projecCard.init();
  $ProjectContainer.appendChild(card);
  projecCard.initContent();
  projecCard.addListeners();
}
