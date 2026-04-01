const _url = `https://rickandmortyapi.com/api/character`

let numberPage = 1;
const listCards = document.getElementById('list-person')
const divBtns = document.getElementById('btns')
let queryName = ''
let queryStatus = ''

const fetchApi = async () => {
    try {
        const response = await fetch(`${_url}/?page=${numberPage}`)
        const data = await response.json()
        const listCardHtml = data.results.map(person => renderCards(person))
        listCards.innerHTML = listCardHtml.join("")
        filterPage()
    } catch (error) {
        console.error(`Erro na requisição: ${error}`)
    }
}

const renderCards = (person) => {
    let namePerson = person.name
    let statusPerson = person.status
    let speciesPerson = person.species
    let imagePerson = `<img src="${person.image}" alt="Imagem do personagem ${namePerson} ">`

    return `
        <div class="persons">
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
    numberPage += 1
    fetchApi()
}
const previousPage = () => {
    if (numberPage > 1) {
        numberPage -= 1
        fetchApi()
    }
}

const filterPage = () => {
    if (numberPage != null) {
        if (numberPage === 1 || numberPage < 1) {
            divBtns.innerHTML = ` <span id="count-page">Página ${numberPage} de 45</span>
            <button id="btn-next" class="btn-page" onclick="nextPage()">Proxima Página</button>`
        }
        else if (numberPage === 42) {
            divBtns.innerHTML = `<button id="btn-previous" class="btn-page" onclick="previousPage()" >Página Anterior</button>
             <span id="count-page">Página ${numberPage} de 45</span>
            `
        }
        else {
            divBtns.innerHTML = `<button id="btn-previous" class="btn-page" onclick="previousPage()" >Página Anterior</button>
             <span id="count-page">Página ${numberPage} de 45</span>
            <button id="btn-next" class="btn-page" onclick="nextPage()">Proxima Página</button>
            `
        }
    } else {
        console.error(`Erro ao trocar de pagina`)
    }
}

const filterSearch = () =>{

}

fetchApi();
