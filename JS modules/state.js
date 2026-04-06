const API_URL = 'https://wedev-api.sky.pro/api/v1/origami/comments';

let comments = [];

export const getComments = () => comments.slice();

export function loadComments() {
    return fetch(API_URL)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            comments = data.comments.map((c) => ({
                name: c.author.name,
                text: c.text,
                date: new Date(c.date).toLocaleString('ru-RU'),
                likes: c.likes,
                isLiked: false,
                isLikeLoading: false,
            }));
        });
}

export function saveComment({ name, text }) {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ name, text }),
    }).then((res) => {
        if (!res.ok) {
            return res.json().then((err) => {
                throw new Error(err.error || 'Ошибка сервера');
            });
        }
    });
}

export function toggleLike(index) {
    const c = comments[index];
    if (!c) return;
    c.isLiked = !c.isLiked;
    c.likes += c.isLiked ? 1 : -1;
}

export function setLikeLoading(index, value) {
    const c = comments[index];
    if (!c) return;
    c.isLikeLoading = value;
}
