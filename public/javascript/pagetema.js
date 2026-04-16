document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode ---
    const btnTema = document.getElementById('toggle-theme');
    
    function aplicarTema(tema) {
        if (tema === 'dark') {
            document.body.classList.add('dark-mode'); // add
            if (btnTema) btnTema.innerHTML = '☀️ White Mode';
        } else {
            document.body.classList.remove('dark-mode'); //remove
            if (btnTema) btnTema.innerHTML = '🌙 Dark Mode';
        }
    }

    const temaSalvo = localStorage.getItem('theme');
    aplicarTema(temaSalvo);

    // atualiza o botao e salva o tema no localstorage
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            const novoTema = document.body.classList.contains('dark-mode') ? 'dark' : 'light';

            // Salva a escolha ("dark" ou "light")
            localStorage.setItem('theme', novoTema);

            // Atualiza o texto do botão
            aplicarTema(novoTema);
        });
    }
});