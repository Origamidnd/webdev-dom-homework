import { getComments, loadComments } from './state.js';
import { renderComments } from './view.js';
import { initAddComment } from './addComment.js';
import { initLikeHandler } from './likeHandler.js';
import { initQuoteHandler } from './quoteHandler.js';

const nameInput = document.getElementById('name');
const textInput = document.getElementById('comment');
const button = document.getElementById('button');
const listRoot = document.querySelector('.comments');

initAddComment({ nameInput, textInput, button, listRoot });
initLikeHandler({ listRoot });
initQuoteHandler({ listRoot, textInput });

listRoot.innerHTML = '<div class="loading">Загружаем комментарии...</div>';

loadComments().then(() => {
    renderComments(listRoot, getComments());
});
