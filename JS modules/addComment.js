import { saveComment, loadComments, getComments } from './state.js';
import { renderComments } from './view.js';

export function initAddComment({ nameInput, textInput, button, listRoot }) {
    const handlePostClick = (retryCount = 0) => {
        const textValue = textInput.value.trim();

        if (textValue.length < 3) {
            alert('Комментарий должен быть не короче 3 символов');
            return;
        }

        button.disabled = true;
        button.textContent = 'Отправляем...';

        saveComment({ text: textValue })
            .then(() => loadComments())
            .then(() => {
                renderComments(listRoot, getComments());
                textInput.value = '';
            })
            .catch((e) => {
                if (e.message === 'Failed to fetch') {
                    alert('Кажется, у вас сломался интернет, попробуйте позже');
                    return;
                }

                if (e.message === 'Ошибка сервера') {
                    if (retryCount < 3) {
                        setTimeout(() => {
                            handlePostClick(retryCount + 1);
                        }, 1000);
                    } else {
                        alert('Сервер сломался, попробуй позже');
                    }
                    return;
                }

                if (e.message === 'Ошибка запроса') {
                    alert('Ошибка запроса');
                    return;
                }

                alert(e.message);
            })
            .finally(() => {
                button.disabled = false;
                button.textContent = 'Написать';
            });
    };

    button.addEventListener('click', () => handlePostClick());
}
