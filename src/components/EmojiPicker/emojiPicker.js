import './styles.css';
import { EmojiButton } from '@joeattardi/emoji-button';

const emojiPickerTmpl = `
<button class="project-form__emoji-picker">📋</button>
`;

export class EmojiPicker {
  HTMLContent = emojiPickerTmpl;
  selection = '📋';
  emojiButtonInstance = null;

  init() {
    this.emojiButtonInstance = new EmojiButton({
      theme: 'dark',
      emojiSize: '20px',
      style: 'rounded',
      backgroundColor: '#ffffff',
      showVariants: false,
      emojiButtonClass: 'emoji-btn',
      // Clase personalizada para el botón del selector de emoji {default => 'emoji-btn'}
      closeButtonClass: 'emoji-btn-close',
      // Clase personalizada para el botón de cerrar {default => 'emoji-btn-close'}
    });

    const triggerButton = document.querySelector('.project-form__emoji-picker');
    triggerButton.addEventListener('click', event => {
      event.preventDefault();
      this.emojiButtonInstance.togglePicker(this.emojiPicker);
    });

    this.emojiButtonInstance.on('emoji', selection => {
      triggerButton.innerHTML = selection.emoji;
      this.selection = selection.emoji;
    });
  }
}

export { emojiPickerTmpl };
