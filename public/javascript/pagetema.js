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

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const temaSalvo = usuarioLogado
        ? localStorage.getItem(`theme_${usuarioLogado.id}`)
        : "light";

    aplicarTema(temaSalvo || "light");

    // atualiza o botao e salva o tema no localstorage
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            // classlist.toggle → verifica qual tema está ativo 'dark' | 'light'
            document.body.classList.toggle('dark-mode');

            const novoTema = document.body.classList.contains('dark-mode')
                ? 'dark'
                : 'light';

            const usuarioLogadoAtual = JSON.parse(localStorage.getItem("usuarioLogado"));

             if (usuarioLogadoAtual) {
                localStorage.setItem(`theme_${usuarioLogadoAtual.id}`, novoTema);
             }
             
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