import './styles.css';
import { emojiPickerTmpl } from '../EmojiPicker/emojiPicker.js';

export const projectFormTmpl = `
<form class="project-form">
  <div class="project-form__group--emoji">
    <label class="label" for="emoji-picker">Pick a emoji ${emojiPickerTmpl}</label>
  </div>
  <div class="project-form__group--main">
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
        spellcheck="false"
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
        spellcheck="false"
      ></textarea>
    </label>
  </div>
  <button class="project-form__submit">Add project</button>
</form>
`;
