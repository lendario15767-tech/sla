const tabs = document.querySelectorAll('.tabs span')
const aviso = document.querySelector('.aviso-retirada')

const categorias = document.querySelector('.categorias')
const cupons = document.querySelector('.cupons')
const ultimos = document.querySelector('.ultimos')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    // remove ativo de todas
    tabs.forEach(t => t.classList.remove('ativo'))
    tab.classList.add('ativo')

    if (tab.innerText === 'retirada') {
      aviso.style.display = 'block'
      categorias.classList.add('oculto')
      cupons.classList.add('oculto')
      ultimos.classList.add('oculto')
    } else {
      aviso.style.display = 'none'
      categorias.classList.remove('oculto')
      cupons.classList.remove('oculto')
      ultimos.classList.remove('oculto')
    }

  })
})

