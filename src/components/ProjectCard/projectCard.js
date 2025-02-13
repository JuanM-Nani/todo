const projectCardTmpl = `
<h1 class="project-card__emoji"></h1>
  <div class="project-card__group--main">
    <h2 class="project-card__name"></h2>
    <p class="project-card__description"></p>
  </div>
<button class="project-card__option--open">Open</button>
`;
export class ProjectCard {
  constructor(project) {
    this.project = project;
    this.card = null;
    this.emojiPicker = null;
  }

  init() {
    const $ProjectContainer = document.querySelector('.project-container');
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.setAttribute('data-projectID', this.project.projectID);
    card.innerHTML = projectCardTmpl;
    $ProjectContainer.appendChild(card);
    this.card = card;
  }

  initContent() {
    const emoji = this.card.querySelector('.project-card__emoji');
    const name = this.card.querySelector('.project-card__name');
    const description = this.card.querySelector('.project-card__description');

    emoji.textContent = this.project.emoji;
    name.textContent = this.project.name;
    description.textContent = this.project.description || 'No description';
  }
}
