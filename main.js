const botao = document.getElementById("btn-acessar");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const tela = document.querySelector(".principal");

botao.addEventListener("click", function () {

    if (email.value === "" || senha.value === "") {
        alert("Preencha usuário e senha!");
        return;
    }

    // animação de saída
    tela.classList.add("fade-out");

    // redireciona após animação
    setTimeout(() => {
        window.location.href = "home.html";
    }, 600);
});
