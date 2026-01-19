const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // impede recarregar a página

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email !== "" && senha !== "") {
    // usuário pode acessar a home
    window.location.href = "home.html";
  } else {
    alert("Preencha todos os campos!");
  }
});
