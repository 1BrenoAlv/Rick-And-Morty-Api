const _url = `https://rickandmortyapi.com/api/character`

let numberPage = 1;
const listCards = document.getElementById('list-person')
const divBtns = document.getElementById('btns')
const formFilter = document.getElementById('form-filter')
const btnApply = document.getElementById('apply-filter')
const btnReset = document.getElementById('clear-filter')
const modalPerson = document.getElementById('modal-person')
const closeModal = document.getElementById('btn-close')
let persoCurrent = []

const fetchApi = async () => {
    try {
        const queryName = document.getElementById('inp-search').value
        const queryStatus = document.getElementById('filter-status').value
        const querySpecies = document.getElementById('filter-species').value
        const queryGender = document.getElementById('filter-gender').value
        const url = new URL(_url)

        url.searchParams.append('page', numberPage) // Contar o numero de paginas
        if (queryName) url.searchParams.append('name', queryName)
        if (queryStatus) url.searchParams.append('status', queryStatus)
        if (querySpecies) url.searchParams.append('species', querySpecies)
        if (queryGender) url.searchParams.append('gender', queryGender)

        const response = await fetch(url)
        const data = await response.json()
        persoCurrent = data.results

        if (!response.ok || data.error) {
            listCards.innerHTML = `<p class="erro-p">Nenhum Personagem Encontrado 😭</p>`
            divBtns.innerHTML = ''
            return
        }

        const nextPageExist = data.info.next !== null
        const prevPageExist = data.info.prev !== null

        const pagesTotal = data.info.pages
        const personTotal = data.info.count
        const results = data.results
        const listCardHtml = results.map(person => renderCards(person))
        listCards.innerHTML = listCardHtml.join("")
        const personCurrent = listCardHtml.length
        filterPage(pagesTotal, personCurrent, personTotal, prevPageExist, nextPageExist)

    } catch (error) {
        console.error(`Erro na requisição: ${error}`)
        listCards.innerHTML = `<p class="erro-p">Erro Interno😭</p>`
        divBtns.innerHTML = ''
    } finally {
        btnApply.disabled = false
        if (btnReset) btnReset.disabled = false
        btnApply.textContent = 'Aplicar'
    }
}

const renderCards = (person) => {
    let namePerson = person.name ?? 'Desconhecido'
    let statusPerson = person.status ?? 'Desconhecido'
    let speciesPerson = person.species ?? 'Desconhecida'
    let imagePerson = person.image != null ? `<img src="${person.image}" alt="Imagem do personagem ${namePerson} ">`
        : `<img src="./assets/image-desconhecida.png" alt="Imagem do personagem ${namePerson} ">`

    return `
        <div class="persons" data-id="${person.id}">
                        <div class="img-person">
                            ${imagePerson}
                        </div>
                        <div class="info-person">
                            <span class="name-person">${namePerson}</span>
                            <div class="type-person">
                                <span class="status-person ${statusPerson.toLowerCase()}"></span>
                                <p>${statusPerson} - ${speciesPerson}</p>
                            </div>
                        </div>
                    </div>
    `
}

const nextPage = () => {
    setTimeout(() => {
        numberPage += 1
        fetchApi()
    }, 1500)
    divBtns.innerHTML = ''
    listCards.innerHTML = '<div class="loader"></div>'
}
const previousPage = () => {
    setTimeout(() => {
        if (numberPage > 1) {
            numberPage -= 1
            fetchApi()
        }
    }, 1500)
    divBtns.innerHTML = ''
    listCards.innerHTML = '<div class="loader"></div>'
}

const filterPage = (pagesTotal, personCurrent, personTotal, prev,next) => {
    if (numberPage != null) {
        const btnNext = next ? `<button id="btn-next" class="btn-page" onclick="nextPage()">Proxima Página </button>` : ''
        const btnPrev = prev ? `<button id="btn-previous" class="btn-page" onclick="previousPage()" >Página Anterior</button>` : ''
        divBtns.innerHTML = `
            <div class="current-person"> <span>Mostrando ${personCurrent} de ${personTotal}</span> </div>
            <div class="sec-btn">
            ${btnPrev}
            <span id="count-page">Página ${numberPage} de ${pagesTotal}</span>
            ${btnNext}
        `
    }else{
        console.error('Erro ao Trocar de página')
    }
}

formFilter.addEventListener('submit', e => {
    e.preventDefault()
    btnApply.disabled = true
    if (btnReset) btnReset.disabled = true
    btnApply.textContent = 'Buscando...'
    setTimeout(() => {
        numberPage = 1
        fetchApi()
    }, 1500)
    divBtns.innerHTML = ''
    listCards.innerHTML = '<div class="loader"></div>'
})

listCards.addEventListener('click' , e => {
    const cardClick = e.target.closest('.persons')
    if(!cardClick) return
    const persoId = cardClick.getAttribute('data-id')
    const persoCheck = persoCurrent.find(p => p.id == persoId)
    if(persoCheck)
        putModal(persoCheck)
})

const putModal = (perso) => {
    document.getElementById('img-modal').innerHTML = `<img src="${perso.image}" alt="${perso.name}">`
    document.getElementById('space-name-modal').innerText = perso.name
    const statusSpan = document.querySelector('.status-modal')
    statusSpan.className = `status-modal ${perso.status.toLowerCase()}`
    statusSpan.innerText = `${perso.status}`
    document.getElementById('gander-modal').innerText = `${perso.species} - ${perso.gender}`
    const spansRight = document.getElementsByClassName('right-modal')
    spansRight[0].innerText = perso.origin.name
    spansRight[1].innerText = perso.location.name
    spansRight[2].innerText = perso.episode.length

    modalPerson.showModal()
}

closeModal.addEventListener('click', () => {
    modalPerson.close()
})



fetchApi();
