import flatpickr from 'flatpickr';
import './styles.css';

const datePickerTmpl = `
<input class="task-form__input" type="text" name="date-picker" id="date-picker">
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
      allowInput: false,
      minuteIncrement: 1,
      disableMobile: true,
    });
  }

  setMinDate(date) {
    this.flatpickrInstance.set('minDate', new Date());
    this.flatpickrInstance.setDate(date);
  }
}

function destroyDatePicker() {
  const calendarDiv = document.querySelector('.flatpickr-calendar');
  if (!!calendarDiv) calendarDiv.remove();
}

export { datePickerTmpl, DatePickerHandler, destroyDatePicker };
