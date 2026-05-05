export function renderLogin(root, onLogin) {
    root.innerHTML = `
    <div class="add-form">
        <input id="login" class="add-form-name" placeholder="Логин" />
        <input id="password" type="password" class="add-form-name" placeholder="Пароль" />
        <div class="add-form-row">
            <button id="login-btn" class="add-form-button">Войти</button>
        </div>
    </div>
`;

    document.getElementById('login-btn').addEventListener('click', () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        onLogin({ login, password });
    });
}
