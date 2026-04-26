export function renderLogin(root, onLogin) {
    root.innerHTML = `
        <div class="add-form">
            <input id="login" placeholder="Логин" />
            <input id="password" type="password" placeholder="Пароль" />
            <button id="login-btn">Войти</button>
        </div>
    `;

    document.getElementById('login-btn').addEventListener('click', () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        onLogin({ login, password });
    });
}
