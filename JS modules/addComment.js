// Добавление комментария
import { addComment, getComments } from './state.js';
import { sanitize, nowRu } from './utils.js';
import { renderComments } from './view.js';

export function initAddComment({ nameInput, textInput, button, listRoot }) {
    button.addEventListener('click', () => {
        const nameValue = sanitize(nameInput.value);
        const textValue = sanitize(textInput.value);
        if (!nameValue || !textValue) {
            alert('Напиши что-нибудь!');
            return;
        }
        addComment({ name: nameValue, text: textValue, date: nowRu() });
        renderComments(listRoot, getComments());
        nameInput.value = '';
        textInput.value = '';
    });
}
