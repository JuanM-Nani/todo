import { EmojiPicker } from '../components/EmojiPicker/emojiPicker.js';
import { Listener } from '../utils/Listener.js';
import { addListeners } from '../utils/addListener.js';
import { Project } from '../logic/Project.js';
import { ProjectStorage } from '../logic/ProjectStorage.js';
import { ProjectCard } from '../components/ProjectCard/projectCard.js';
import { ProjectCardHandler } from '../components/ProjectCard/projectCard_handler.js';
import { TaskStorage } from '../logic/TaskStorage.js';

const emojiPicker = new EmojiPicker();

const projectSectionHTML = `
<section class="projects">
  <header class="projects__header">
    <form class="project-form">
      <label class="label" for="emoji-picker">
        Pick a emoji ${emojiPicker.HTMLContent}
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
  emojiPicker.init();
  initProjectCards();
  addListeners(submitProject);
}

function initProjectCards() {
  const projects = ProjectStorage.show();
  projects.forEach(p => {
    createProjectCard(p);
  });
}

const submitProject = new Listener('.project-form__submit', 'click', event => {
  const $Form = document.querySelector('.project-form');

  if ($Form.checkValidity()) {
    event.preventDefault();
    createProject($Form);
    $Form.reset();

    const $PickerTrigger = document.querySelector('.project-form__emoji-picker');
    $PickerTrigger.innerHTML = '📋';
    emojiPicker.selection = '📋';
  }
});

function createProject(form) {
  const emoji = emojiPicker.selection;
  const name = form.querySelector('.project-form__name').value;
  const description = form.querySelector('.project-form__description').value;

  const project = new Project(emoji, name, description);
  ProjectStorage.addProject(project);

  createProjectCard(project);
}

function createProjectCard(project) {
  const card = new ProjectCard(project);
  card.init();
  card.initContent();
  const projectCardHandler = new ProjectCardHandler(project, card);
}

export { projectSectionHTML, initProjectSection };
