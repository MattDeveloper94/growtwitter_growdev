// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    function configContadorTweet() {
        const campoTweet = document.getElementById("tweetContent");
        const contador = document.getElementById("contador");


        if (!campoTweet || !contador)
            return;

        campoTweet.addEventListener("input", () => {
            campoTweet.style.height = "auto"; // reseta
            campoTweet.style.height = campoTweet.scrollHeight + "px"; // cresce
            const tamanhoTweet = campoTweet.value.length;

            contador.textContent = `${tamanhoTweet}/280`;
            if (tamanhoTweet > 280) {
                contador.style.color = "red";
            } else if (tamanhoTweet > 250) {
                contador.style.color = "orange";
            } else {
                contador.style.color = "#667";
            }
        });
    }

    configContadorTweet();
});
