const listaCarnes = [
    {
        id: 1,
        nome: 'Picanha Premium',
        preco: 89.90,
        imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800',
        descricao: 'Corte nobre com capa de gordura uniforme, extremamente macia e suculenta.',
        ingredientes: 'Carne bovina (Picanha), Sal grosso, Alho confitado.',
        nutricional: 'Proteínas: 25g | Gorduras: 18g | Calorias: 280 kcal'
    },
    {
        id: 2,
        nome: 'Filé Mignon ao Molho',
        preco: 95.00,
        imagem: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800',
        descricao: 'O corte mais macio do boi, servido com molho madeira artesanal e cogumelos.',
        ingredientes: 'Filé mignon, vinho tinto, champignon, caldo de carne natural.',
        nutricional: 'Proteínas: 28g | Gorduras: 8g | Calorias: 210 kcal'
    },
    {
        id: 3,
        nome: 'Costela BBQ',
        preco: 74.50,
        imagem: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800',
        descricao: 'Costela suína defumada por 6 horas, desmanchando no osso com molho especial.',
        ingredientes: 'Costela suína, molho barbecue artesanal, mix de pimentas.',
        nutricional: 'Proteínas: 22g | Gorduras: 25g | Calorias: 350 kcal'
    },
    {
        id: 4,
        nome: 'Ancho Argentino',
        preco: 82.00,
        // Link atualizado e mais estável:
        imagem: 'https://images.unsplash.com/photo-1594041667872-10277737e3fd?auto=format&fit=crop&w=800',
        descricao: 'Corte retirado do lombo, com marmoreio intenso que garante sabor e maciez.',
        ingredientes: 'Bife Ancho premium, sal de parrilla, manteiga de ervas.',
        nutricional: 'Proteínas: 24g | Gorduras: 20g | Calorias: 310 kcal'
    }
];

function renderizarProdutos() {
    const container = document.getElementById('lista-produtos');
    if(!container) return;

    container.innerHTML = listaCarnes.map((item, index) => `
        <div class="produto" onclick="selecionarProduto(${index})">
            <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/300x200?text=Carne+Premium'">
            <h3>${item.nome}</h3>
            <p class="descricao-curta">${item.descricao}</p>
            <div class="produto-footer">
                <span class="preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                <button class="btn-add">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Função de clique corrigida para evitar erros de aspas no HTML
function selecionarProduto(index) {
    const produto = listaCarnes[index];
    localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
    window.location.href = "pedido.html";
}

function scrollCarousel(direction) {
    const container = document.getElementById('lista-produtos');
    const scrollAmount = 350; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

window.onload = renderizarProdutos;