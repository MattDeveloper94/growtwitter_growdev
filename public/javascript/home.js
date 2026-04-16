// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // --- verifica se o campo search ta em foco ---
    const busca = document.getElementById('searchField');
    if (busca) {
        busca.addEventListener('blur', () => {
            busca.value = ''; // Limpa ao clicar fora
        });
    }

    // --- verifica se o campo tweet-box ta em foco ---
    const tweetBox = document.getElementById('tweetContent');
    if (tweetBox) {
        tweetBox.addEventListener('blur', () => {
            tweetBox.value = ''; // Limpa ao clicar fora
        });
    }
});
