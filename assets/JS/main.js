const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function showPokemonDetails(pokemon) {
    alert(`Nome: ${pokemon.name}\nTipo(s): ${pokemon.types.join(', ')}\nPoder: ${pokemon.type}`);
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
        pokemonList.innerHTML += newHtml;

        
    });
}

const pokemonElements = document.querySelectorAll('.pokemon');
pokemonElements.forEach((element, index) => {
    element.addEventListener('click', () => showPokemonDetails(pokemons[index]));
});


loadPokemonItens(offset, limit);
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit;

    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)

    }

})










