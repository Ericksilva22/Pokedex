const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.formulario');
const input = document.querySelector('.pesquisa');

const buttonPrev = document.querySelector('.button-prev');
const buttonNext = document.querySelector('.button-next');

let pesquisa = '1';

const fetchpokemon = async(pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIresponse.status === 200 ) {
        const data = await APIresponse.json();
        return data;

    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'; /* Valores antes da pesquisa */
    pokemonNumber.innerHTML = '';

    const data = await fetchpokemon(pokemon);
    if(data) { /* Para o pokémon existir */

        
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        pesquisa = data.id;

    } else {
        pokemonImage.getElementsByClassName.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit',(event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());  
});

buttonPrev.addEventListener('click',() => {
    if(pesquisa > 1) {
        pesquisa -= 1;
        renderPokemon(pesquisa);
    }
   
});

buttonNext.addEventListener('click',()=> {
    pesquisa += 1;
    renderPokemon(pesquisa);
});

renderPokemon(pesquisa);
