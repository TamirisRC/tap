document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const cep = document.getElementById('cep').value;
    const logradouro = document.getElementById('logradouro').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                senha,
                nome,
                idade,
                sexo,
                dadosEndereco: {
                    cep,
                    logradouro,
                    bairro,
                    cidade,
                    estado
                }
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Usuário cadastrado com sucesso. Você pode fazer login agora.');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao cadastrar usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar');
    }
});