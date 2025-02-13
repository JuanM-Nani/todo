// de aqui hay que importar el radio, el select, y el datePicker
import { PriorityRadio } from '../PriorityRadio/priorityRadio_tmpl.js';
import { datePickerTmpl } from '../DatePicker/datePicker_handler.js';
import { forProjectSelectTmpl } from '../ForProjectSelect/projectSelect_handler.js';

export const taskFormTmpl = `
<form class="task-form" action="">
  <div class="task-form__group--text">
    <label class="task-form__label" for="title">
      Title
      <input class="task-form__title" type="text" name="title" id="title" required/>
    </label>
    <label class="task-form__label" for="description">
      Description
      <textarea class="task-form__description" name="description" id="description"></textarea>
    </label>
  </div>
  <div class="task-form__group--due-date">
    <label for="no-due-date">
      Date picker
      ${datePickerTmpl}
    </label>
    <label for="no-due-date">
      No due date
      <input class="task-form__no-due-date" type="checkbox" name="no-due-date" id="no-due-date" />
    </label>
  </div>
  <div class="task-form__group--priority">
    <label for="priority">Priority</label>
    ${PriorityRadio} 
  </div>
  <div class="task-form__group--for-project">
    <label for="for-project">
      For project
    ${forProjectSelectTmpl}
    </label>
  </div>
  <button class="task-form__submit">Create task</button>
</form>
`;
