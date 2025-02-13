import { emojiPickerTmpl, EmojiPicker } from '../components/EmojiPicker/emojiPicker.js';
import { ProjectStorage } from '../logic/ProjectStorage.js';
import { createProjectCard } from '../utils/createProjectCard.js';
import { ProjectFormHandler } from '../components/ProjectForm/projectForm_handler.js';

const projectSectionHTML = `
<section class="projects">
  <header class="projects__header">
    <form class="project-form">
      <label class="label" for="emoji-picker">
        Pick a emoji ${emojiPickerTmpl}
      </label>
      <label class="label" for="name">
        Project name
        <input class="project-form__name" type="text" id="name" required />
      </label>
      <label class="label" for="description">
        Description
        <textarea class="project-form__description" id="description"></textarea>
      </label>
      <button class="project-form__submit">Add project</button>
    </form>
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
