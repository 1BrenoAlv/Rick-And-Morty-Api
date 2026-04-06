const btnMenu = document.getElementById('btn-mobile-menu')
const asideMenu = document.querySelector('aside')

btnMenu.addEventListener('click', () => {
    asideMenu.classList.toggle('open')
})