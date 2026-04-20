document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode ---
    const btnTema = document.getElementById('toggle-theme');

    function aplicarTema(tema) {
        if (tema === 'dark') {
            document.body.classList.add('dark-mode'); // add
            if (btnTema) btnTema.innerHTML = '☀️';
        } else {
            document.body.classList.remove('dark-mode'); //remove
            if (btnTema) btnTema.innerHTML = '🌙';
        }
    }

    const temaSalvo = localStorage.getItem('theme');
    aplicarTema(temaSalvo);

    // atualiza o botao e salva o tema no localstorage
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            // classlist.toggle → verifica qual tema está ativo 'dark' | 'light'
            document.body.classList.toggle('dark-mode');
            let novoTema = document.body.classList.contains('dark-mode')
            if (novoTema)
                novoTema = 'dark';
            else
                novoTema = 'light'

            // Salva a escolha ("dark" ou "light")
            localStorage.setItem('theme', novoTema);

            // Atualiza o texto do botão
            aplicarTema(novoTema);
        });

        btnTema.addEventListener('mouseenter', () => {
            // classlist.contains → verifica qual tema está ativo
            if (document.body.classList.contains('dark-mode')) {
                btnTema.setAttribute('title', 'Mudar para tema claro');
            } else {
                btnTema.setAttribute('title', 'Mudar para tema escuro');
            }
        });
        
    }
});