import { Project } from '../../logic/Project.js';
import { createProjectCard } from '../../utils/createProjectCard.js';
import { EmojiPicker } from '../EmojiPicker/emojiPicker.js';
import { ProjectStorage } from '../../logic/ProjectStorage.js';

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

  addListeners(closeProjectView) {
    const submitForm =
      closeProjectView || this.form.querySelector('.project-form__submit');

    submitForm.addEventListener('click', event => {
      if (this.form.checkValidity()) {
        event.preventDefault();

        const values = this.getValues();
        if (!closeProjectView) {
          createProject(values);
          this.form.reset();
          this.emojiPicker.selection = '📋';
          this.emojiPicker.triggerButton.innerHTML = '📋';
        }
      }
    });
  }
}

function createProject(values) {
  const project = new Project(...values);
  ProjectStorage.addProject(project);
  createProjectCard(project);
}
