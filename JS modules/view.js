// Рендер списка
export function renderComments(rootEl, comments) {
    const items = comments.map(
        (item, index) => `
        <li class="comment">
          <div class="comment-header">
            <div>${item.name}</div>
            <div>${item.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${item.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${item.likes}</span>
              <button class="like-button${
                  item.isLiked ? ' -active-like' : ''
              }${item.isLikeLoading ? ' -loading-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`,
    );
    rootEl.innerHTML = items.join('');
}
