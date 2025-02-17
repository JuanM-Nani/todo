import './styles.css';
import { emojiPickerTmpl } from '../EmojiPicker/emojiPicker.js';

const pattern = '//';

export const projectFormTmpl = `
<form class="project-form">
  <label class="label" for="emoji-picker">Pick a emoji ${emojiPickerTmpl}</label>
  <label class="label" for="name">
    Project name
    <input
      class="project-form__name"
      type="text"
      id="name"
      autocomplete="off"
      placeholder="JS interpreter"
      minlength="6"
      maxlength="20"
      required
    />
  </label>
  <label class="label" for="description">
    Description
    <textarea
      class="project-form__description"
      id="description"
      placeholder="Develop a Javascript interpreter with rust"
      minlength="10"
      maxlength="120"
    ></textarea>
  </label>
  <button class="project-form__submit">Add project</button>
</form>
`;
