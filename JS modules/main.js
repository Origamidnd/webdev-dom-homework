import { getComments, loadComments, login, getUser } from './state.js';
import { renderComments } from './view.js';
import { initAddComment } from './addComment.js';
import { renderLogin } from './loginView.js';

const listRoot = document.querySelector('.comments');
const appRoot = document.querySelector('.container');
const form = document.querySelector('.add-form');

function renderApp() {
    listRoot.innerHTML = '<div class="loading">Загружаем...</div>';

    loadComments()
        .then(() => {
            renderComments(listRoot, getComments());

            if (!getUser()) {
                form.style.display = 'none';

                const link = document.createElement('div');
                link.innerHTML =
                    '<a href="#">Чтобы добавить комментарий, авторизуйтесь</a>';

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderLogin(appRoot, handleLogin);
                });

                appRoot.appendChild(link);
            } else {
                form.style.display = 'block';

                const nameInput = document.getElementById('name');
                const textInput = document.getElementById('comment');
                const button = document.getElementById('button');

                nameInput.value = getUser().name;
                nameInput.setAttribute('readonly', true);

                initAddComment({ nameInput, textInput, button, listRoot });
            }
        })
        .catch(() => {
            alert('Ошибка загрузки');
        });
}

function handleLogin({ login: userLogin, password }) {
    login({ login: userLogin, password })
        .then(() => {
            location.reload();
        })
        .catch(() => {
            alert('Неверные данные');
        });
}

renderApp();
