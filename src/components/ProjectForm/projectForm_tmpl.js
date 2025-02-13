import { emojiPickerTmpl } from '../EmojiPicker/emojiPicker.js';

export const projectFormTmpl = `
<form class="project-form">
  <label class="label" for="emoji-picker">Pick a emoji ${emojiPickerTmpl}</label>
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
`;
