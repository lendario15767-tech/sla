document.addEventListener('DOMContentLoaded', () => {

  /* =====================
     CARRINHO
  ===================== */
  const lista = document.getElementById('listaCarrinho');
  const totalSpan = document.getElementById('totalPedido');

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  function renderCarrinho() {
    lista.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      lista.innerHTML += `
        <div class="item-carrinho">
          <img src="${item.imagem}">
          <div class="info">
            <p class="nome">${item.nome}</p>
            <span>R$ ${item.preco.toFixed(2)}</span>
          </div>

          <input type="number" min="1" value="${item.quantidade}"
            onchange="alterarQtd(${index}, this.value)">

          <strong>R$ ${subtotal.toFixed(2)}</strong>
        </div>
      `;
    });

    totalSpan.innerText = total.toFixed(2);
  }

  window.alterarQtd = function(index, qtd) {
    carrinho[index].quantidade = Number(qtd);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderCarrinho();
  };

  renderCarrinho();

  /* =====================
     ELEMENTOS
  ===================== */
  const form = document.getElementById('finalizarForm');
  const endereco = document.getElementById('endereco');
  const pagamentoSelect = document.getElementById('pagamento');

  const pixBox = document.getElementById('pixBox');
  const cartaoBox = document.getElementById('cartaoBox');
  const dinheiroBox = document.getElementById('dinheiroBox');

  const pixTotal = document.getElementById('pixTotal');
  const cartaoTotal = document.getElementById('cartaoTotal');
  const dinheiroTotal = document.getElementById('dinheiroTotal');

  const numeroCartao = document.getElementById('numeroCartao');
  const nomeCartao = document.getElementById('nomeCartao');
  const validade = document.getElementById('validade');
  const cvv = document.getElementById('cvv');

  const precisaTroco = document.getElementById('precisaTroco');
  const trocoValor = document.getElementById('trocoValor');

  /* =====================
     PAGAMENTO
  ===================== */
  pagamentoSelect.addEventListener('change', () => {
    pixBox.style.display = 'none';
    cartaoBox.style.display = 'none';
    dinheiroBox.style.display = 'none';

    if (pagamentoSelect.value === 'pix') {
      pixBox.style.display = 'block';
      pixTotal.innerText = totalSpan.innerText;
    }

    if (pagamentoSelect.value === 'cartao') {
      cartaoBox.style.display = 'block';
      cartaoTotal.innerText = totalSpan.innerText;
    }

    if (pagamentoSelect.value === 'dinheiro') {
      dinheiroBox.style.display = 'block';
      dinheiroTotal.innerText = totalSpan.innerText;
    }
  });

  precisaTroco.addEventListener('change', () => {
    trocoValor.style.display = precisaTroco.checked ? 'block' : 'none';
  });

  /* =====================
     SUBMIT (BOTÃO FUNCIONA AQUI)
  ===================== */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!endereco.value || !pagamentoSelect.value) {
      alert('Preencha o endereço e a forma de pagamento');
      return;
    }

    if (pagamentoSelect.value === 'cartao') {
      if (!numeroCartao.value || !nomeCartao.value || !validade.value || !cvv.value) {
        alert('Preencha todos os dados do cartão');
        return;
      }
    }

    if (pagamentoSelect.value === 'dinheiro') {
      if (precisaTroco.checked && !trocoValor.value) {
        alert('Informe o valor para troco');
        return;
      }
    }

    localStorage.removeItem('carrinho');
    window.location.href = 'sucesso.html';
  });

});
