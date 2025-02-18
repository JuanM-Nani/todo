export function setTaskExpired(card, task) {
  card.title = 'Task expired, can only be deleted';

  card.classList.add('task-card--expired');
  const $CompletionBtn = card.querySelector('.task-card__option--mark-complete');
  const $EditionBtn = card.querySelector('.task-card__option--edit');

  $CompletionBtn.disabled = true;
  $EditionBtn.disabled = true;

  Object.freeze(task);
}
