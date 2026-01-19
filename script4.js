document.addEventListener("DOMContentLoaded", () => {
  const produtoSalvo = localStorage.getItem("produtoSelecionado");

  if (!produtoSalvo) {
    alert("Erro ao carregar produto");
    window.location.href = "produtos.html";
    return;
  }

  const produto = JSON.parse(produtoSalvo);
  const precoUnitario = produto.preco; // Guarda o valor original

  // ELEMENTOS
  const imagem = document.getElementById("produtoImagem");
  const nome = document.getElementById("produtoNome");
  const precoElemento = document.getElementById("produtoPreco");
  const descricao = document.getElementById("produtoDescricao");
  const ingredientes = document.getElementById("produtoIngredientes");
  const nutricional = document.getElementById("produtoNutricional");
  const quantidadeInput = document.getElementById("quantidade");
  const btnCarrinho = document.getElementById("btnCarrinho");
  const form = document.getElementById("pedidoForm");

  // RENDERIZAÇÃO INICIAL
  imagem.src = produto.imagem;
  nome.innerText = produto.nome;
  precoElemento.innerText = precoUnitario.toFixed(2).replace('.', ',');
  descricao.innerText = produto.descricao;
  ingredientes.innerText = produto.ingredientes;

  nutricional.innerHTML = "";
  const infoNutri = Array.isArray(produto.nutricional) ? produto.nutricional : produto.nutricional.split(",");
  infoNutri.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.trim();
    nutricional.appendChild(li);
  });

  // FUNÇÃO PARA ATUALIZAR O PREÇO DINAMICAMENTE
  function atualizarPrecoTotal() {
    const qtd = Number(quantidadeInput.value);
    if (qtd >= 1) {
      const total = precoUnitario * qtd;
      precoElemento.innerText = total.toFixed(2).replace('.', ',');
    }
  }

  // OUVINTE PARA MUDANÇA NA QUANTIDADE
  quantidadeInput.addEventListener("input", atualizarPrecoTotal);
  quantidadeInput.addEventListener("change", atualizarPrecoTotal);

  // ATUALIZAR BADGE DO CARRINHO
  function atualizarBadge() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const badge = document.getElementById("carrinho-badge");
    if (badge) badge.innerText = carrinho.length;
  }
  atualizarBadge();

  // ADICIONAR AO CARRINHO
  btnCarrinho.addEventListener("click", () => {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({
      ...produto,
      quantidade: Number(quantidadeInput.value),
      precoTotal: precoUnitario * Number(quantidadeInput.value)
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarBadge();
    alert("Produto adicionado ao carrinho!");
  });

  // FINALIZAR PEDIDO
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({
      ...produto,
      quantidade: Number(quantidadeInput.value)
    });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "finalizar.html";
  });
});