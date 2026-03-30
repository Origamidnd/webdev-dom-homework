const API_URL = 'https://wedev-api.sky.pro/api/v1/origami/comments';

let comments = [];

export const getComments = () => comments.slice();

export const loadComments = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    comments = data.comments.map(c => ({
        name: c.author.name,
        text: c.text,
        date: new Date(c.date).toLocaleString('ru-RU'),
        likes: c.likes,
        isLiked: false, // лайки локальные, сбрасываем при загрузке
    }));
};

export const saveComment = async ({ name, text }) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Ошибка сервера');
    }
};

export const toggleLike = (index) => {
    const c = comments[index];
    if (!c) return;
    c.isLiked = !c.isLiked;
    c.likes += c.isLiked ? 1 : -1;
};