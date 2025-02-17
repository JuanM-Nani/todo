import flatpickr from 'flatpickr';
import './styles.css';

const datePickerTmpl = `
<input class="task-form__input" type="text" name="date-picker" id="due-date" readonly>
`;

class DatePickerHandler {
  constructor(triggerElement) {
    this.triggerElement = triggerElement;
    this.flatpickrInstance = null;
  }

  init() {
    this.flatpickrInstance = flatpickr(this.triggerElement, {
      dateFormat: 'd/m/Y H:i',
      defaultDate: new Date(),
      minDate: new Date(),
      enableTime: true,
      time_24hr: true,
      theme: 'dark',
      minuteIncrement: 1,
      allowInput: false,
      disableMobile: true,
      readonlyInput: true,
      nextArrow: '➡️',
      prevArrow: '⬅️',
      appendTo: this.triggerElement.closest('label'),
    });
  }

  setMinDate(date) {
    this.flatpickrInstance.set('minDate', new Date());
    this.flatpickrInstance.setDate(date);
  }
}

export { datePickerTmpl, DatePickerHandler };
