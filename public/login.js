document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!');
            window.location.href = 'register.html';
        } else {
            alert('E-mail ou senha inválidos');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao fazer login');
    }
});