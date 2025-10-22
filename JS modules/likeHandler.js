// Лайки
import { toggleLike, getComments } from './state.js';
import { renderComments } from './view.js';

export function initLikeHandler({ listRoot }) {
    listRoot.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-button');
        if (!likeBtn) return;
        const i = Number(likeBtn.dataset.index);
        if (Number.isNaN(i)) return;
        toggleLike(i);
        renderComments(listRoot, getComments());
    });
}
