import './styles.css';
import { EmojiButton } from '@joeattardi/emoji-button';

const emojiPickerTmpl = `
<button id="emoji-picker">📋</button>
`;

class EmojiPicker {
  constructor(triggerButton) {
    this.triggerButton = triggerButton;
    this.selection = '📋';
    this.emojiButtonInstance = null;
  }

  init() {
    this.emojiButtonInstance = new EmojiButton({
      theme: 'dark',
      emojiSize: '20px',
      style: 'rounded',
      backgroundColor: '#ffffff',
      showVariants: false,
      emojiButtonClass: 'emoji-btn',
      closeButtonClass: 'emoji-btn-close',
      // Clase personalizada para el botón del selector de emoji {default => 'emoji-btn'}
      // Clase personalizada para el botón de cerrar {default => 'emoji-btn-close'}
    });
  }

  addListeners() {
    this.triggerButton.addEventListener('click', event => {
      event.preventDefault();
      this.emojiButtonInstance.togglePicker();
    });

    this.emojiButtonInstance.on('emoji', selection => {
      this.triggerButton.innerHTML = selection.emoji;
      this.selection = selection.emoji;
    });
  }
}

export { emojiPickerTmpl, EmojiPicker };
