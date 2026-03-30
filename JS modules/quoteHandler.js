// Цитирование по клику
export function initQuoteHandler({ listRoot, textInput }) {
    listRoot.addEventListener('click', (e) => {
        const item = e.target.closest('.comment');
        if (!item || !listRoot.contains(item)) return;

        const author =
            item
                .querySelector('.comment-header > div:first-child')
                ?.textContent.trim() ?? '';
        const text =
            item.querySelector('.comment-text')?.textContent.trim() ?? '';
        const quote = `@${author}: "${text}" `;
        textInput.value = quote;
        textInput.focus();
        textInput.setSelectionRange(
            textInput.value.length,
            textInput.value.length,
        );
    });
}
