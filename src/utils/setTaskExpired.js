export function setTaskExpired(card, task) {
  card.classList.add('task-card--expired');
  const $CompletionBtn = card.querySelector('.task-card__option--mark-complete');
  const $EditionBtn = card.querySelector('.task-card__option--edit');

  $CompletionBtn.disabled = true;
  $EditionBtn.disabled = true;

  Object.freeze(task);
}
