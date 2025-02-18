import './styles.css';
import { PriorityRadio } from '../PriorityRadio/priorityRadio_tmpl.js';
import { projectSelectHTML } from './taskForm_handler.js';
import { datePickerTmpl } from '../DatePicker/datePicker_handler.js';

export const taskFormTmpl = `
<form class="task-form" action="">
  <div class="task-form__group--text">
    <label class="task-form__label" for="title">
      Title
      <input
        class="task-form__title"
        type="text"
        name="title"
        id="title"
        autocomplete="off"
        placeholder="Go to gym"
        maxlength="20"
        minlength="6"
        spellcheck="false"
        required
      />
    </label>
    <label class="task-form__label" for="description">
      Description
      <textarea
        class="task-form__description"
        name="description"
        id="description"
        placeholder="Chest day, follow the routine."
        minlength="10"
        maxlength="120"
        spellcheck="false"
      ></textarea>
    </label>
  </div>
  <div class="task-form__group--due-date">
    <label for="due-date">Date picker ${datePickerTmpl}</label>
    <label for="no-due-date">
      No due date
      <input
        class="task-form__no-due-date"
        type="checkbox"
        name="no-due-date"
        id="no-due-date"
      />
    </label>
  </div>
  <div class="task-form__group--priority">
    <label for="priority">Priority</label>
    ${PriorityRadio}
  </div>
  <div class="task-form__group--for-project">
    <label for="for-project">For project ${projectSelectHTML}</label>
  </div>
  <button class="task-form__submit">Create task</button>
</form>
`;
