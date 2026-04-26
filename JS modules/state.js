const API_URL = 'https://wedev-api.sky.pro/api/v2/origami/comments';

let comments = [];
let token = null;
let user = null;

export const getComments = () => comments.slice();
export const getUser = () => user;

export function loadComments() {
    return fetch(API_URL)
        .then((res) => {
            if (!res.ok) {
                if (res.status >= 500) throw new Error('Ошибка сервера');
                throw new Error('Ошибка запроса');
            }
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

export function saveComment({ text }) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    }).then((res) => {
        if (!res.ok) {
            if (res.status >= 500) throw new Error('Ошибка сервера');
            if (res.status === 400) throw new Error('Ошибка запроса');
            throw new Error('Ошибка');
        }
    });
}

export function login({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/v2/origami/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
        .then((res) => {
            if (!res.ok) throw new Error('Неверные данные');
            return res.json();
        })
        .then((data) => {
            token = data.user.token;
            user = data.user;
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