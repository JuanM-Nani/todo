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
      showSearch: false,
      // Clase personalizada para el botón del selector de emoji {default => 'emoji-btn'}
      // Clase personalizada para el botón de cerrar {default => 'emoji-btn-close'}
    });
  }

  addListeners() {
    setTimeout(() => {
      // setTimeOut to wait the element to load
      const emojiPickerWrapper = this.emojiButtonInstance.wrapper;
      this.triggerButton.insertAdjacentElement('afterend', emojiPickerWrapper);

      // To prevent error because the form take the emoji buttons as submit
      const emojiPickerButtons =
        emojiPickerWrapper.querySelectorAll('.emoji-picker__emoji');

      const emojiPathButtons = emojiPickerWrapper.querySelectorAll(
        '.emoji-picker__category-button'
      );

      emojiPickerButtons.forEach(btn => {
        btn.addEventListener('click', event => {
          event.preventDefault();
        });
      });

      emojiPathButtons.forEach(btn => {
        btn.addEventListener('click', event => {
          event.preventDefault();
        });
      });
    }, 0);

    // emoji picker trigger
    this.triggerButton.addEventListener('click', event => {
      event.preventDefault();
      this.emojiButtonInstance.togglePicker(this.triggerButton);
    });

    // user selection event
    this.emojiButtonInstance.on('emoji', selection => {
      this.triggerButton.innerHTML = selection.emoji;
      this.selection = selection.emoji;
    });
  }
}

export { emojiPickerTmpl, EmojiPicker };
