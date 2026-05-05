// Лайки
import { toggleLike, setLikeLoading, getComments } from './state.js';
import { renderComments } from './view.js';
import { delay } from './utils.js';

export function initLikeHandler({ listRoot }) {
    listRoot.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.like-button');
        if (!likeBtn) return;
        const i = Number(likeBtn.dataset.index);
        if (Number.isNaN(i)) return;

        const comments = getComments();
        if (comments[i].isLikeLoading) return;

        setLikeLoading(i, true);
        renderComments(listRoot, getComments());

        delay(2000).then(() => {
            toggleLike(i);
            setLikeLoading(i, false);
            renderComments(listRoot, getComments());
        });
    });
}
