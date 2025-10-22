const comments = [
    {
        name: 'Глеб Фокин',
        text: 'Это будет мой первый комментарий',
        date: '12.02.2024 12:18',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Кто-то еще',
        text: 'Мне нравится внешний вид страницы',
        date: '13.02.2024 19:22',
        likes: 75,
        isLiked: true,
    },
];

export const getComments = () => comments.slice();

export const addComment = ({ name, text, date }) => {
    comments.push({ name, text, date, likes: 0, isLiked: false });
};

export const toggleLike = (index) => {
    const c = comments[index];
    if (!c) return;
    c.isLiked = !c.isLiked;
    c.likes += c.isLiked ? 1 : -1;
};
