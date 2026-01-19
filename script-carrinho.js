const lista = document.getElementById('lista-carrinho');
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderCarrinho() {
  lista.innerHTML = '';

  if (carrinho.length === 0) {
    lista.innerHTML = '<p>seu carrinho está vazio</p>';
    return;
  }

  carrinho.forEach((produto, index) => {
    const item = document.createElement('div');
    item.classList.add('item-carrinho');

    item.innerHTML = `
      <img src="${produto.imagem}">
      <div class="info">
        <p>${produto.nome}</p>
        <span>quantidade: ${produto.quantidade}</span>
      </div>
      <button class="btn-remover">remover</button>
    `;

    item.querySelector('.btn-remover').addEventListener('click', () => {
      carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      renderCarrinho();
    });

    lista.appendChild(item);
  });

  atualizarResumo();
}

function atualizarResumo() {
  const totalItens = carrinho.length;

  const totalQuantidade = carrinho.reduce((soma, item) => {
    return soma + item.quantidade;
  }, 0);

  const totalValor = carrinho.reduce((soma, item) => {
    return soma + (item.preco * item.quantidade);
  }, 0);

  document.getElementById('resumo').innerHTML = `
    <div>
      <p>itens: ${totalItens}</p>
      <p>quantidade: ${totalQuantidade}</p>
    </div>
    <div>
      <p><strong>total</strong></p>
      <p><strong>R$ ${totalValor.toFixed(2)}</strong></p>
    </div>
  `;
}


renderCarrinho();

const btnFinalizar = document.querySelector('.btn-finalizar');
btnFinalizar.addEventListener('click', () => {
  alert('pedido finalizado com sucesso!');
  localStorage.removeItem('carrinho');
  window.location.href = 'home.html';
});

const btnCarrinho = document.querySelector('.btn-carrinho');

btnCarrinho.addEventListener('click', () => {
  const nome = document.getElementById('produtoNome').innerText;
  const imagem = document.getElementById('produtoImagem').src;
  const quantidade = Number(document.getElementById('quantidade').value);

  // preço fictício por enquanto
  const preco = 29.90;

  const produto = {
    nome,
    imagem,
    quantidade,
    preco
  };

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  alert('Produto adicionado ao carrinho!');
});

