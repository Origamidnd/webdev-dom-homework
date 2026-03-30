import { saveComment, loadComments, getComments } from './state.js';
import { sanitize } from './utils.js';
import { renderComments } from './view.js';

export function initAddComment({ nameInput, textInput, button, listRoot }) {
    button.addEventListener('click', async () => {
        const nameValue = sanitize(nameInput.value);
        const textValue = sanitize(textInput.value);
        if (!nameValue || !textValue) {
            alert('Напиши что-нибудь!');
            return;
        }
        button.disabled = true;
        try {
            await saveComment({ name: nameValue, text: textValue });
            await loadComments();
            renderComments(listRoot, getComments());
            nameInput.value = '';
            textInput.value = '';
        } catch (e) {
            alert(e.message);
        } finally {
            button.disabled = false;
        }
    });
}
