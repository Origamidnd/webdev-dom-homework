export function initAddComment({ nameInput, textInput, button, listRoot }) {
    const handlePostClick = (retryCount = 0) => {
        const nameValue = nameInput.value.trim();
        const textValue = textInput.value.trim();

        if (nameValue.length < 3 || textValue.length < 3) {
            alert('Имя и комментарий должны быть не короче 3 символов');
            return;
        }

        button.disabled = true;
        button.textContent = 'Отправляем...';

        saveComment({ name: nameValue, text: textValue })
            .then(() => loadComments())
            .then(() => {
                renderComments(listRoot, getComments());
                nameInput.value = '';
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
