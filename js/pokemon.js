
const titlepokemon = document.querySelector("[title-pokemon]");
const nordenpokemon = document.querySelector("[n-orden]");
const pokemonimg = document.querySelector("[pokemon-img]");
const pokemonheader = document.querySelector("[pokemon-header]");
const pokemonstats = document.querySelector("[pokemon-stats]");

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const valuepokemon = (event) =>{
    event.preventDefault();

    let pokemon = event.target.querySelector("input").value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(data=>data.json()).then(data=> render(data)).catch(error());
}

const render = (data) =>{
    let imgpokemon = data.sprites.front_default;
    let {stats, types} = data;

    titlepokemon.innerHTML = data.name;
    pokemonimg.setAttribute("src", imgpokemon);
    nordenpokemon.innerHTML = `N° ${data.id}`;

    SetCardColor(types);
    SetStats(stats);
}

const SetCardColor = (types = []) =>{
    const OneColor = typeColors[types[0].type.name];
    const TwoColor = types[1] ? typeColors[types[1].type.name] : typeColors.default; 
    pokemonimg.style.background = `radial-gradient(${TwoColor} 33%, ${OneColor} 33%)`;
    pokemonimg.style.backgroundSize = "5px 5px";

    pokemonheader.innerHTML = '';
    types.forEach((tp)=>{
        let div = document.createElement("div");
        div.innerHTML = tp.type.name;
        div.style.color = typeColors[tp.type.name];

        pokemonheader.append(div);
    });
}

const SetStats = (stats) => {
    pokemonstats.innerHTML = '';
    stats.forEach((st)=>{
        let statsamount = document.createElement("div");
        let statsname = document.createElement("div");
        let statvalue = document.createElement("div");

        statsname.innerHTML = st.stat.name;
        statvalue.innerHTML = st.base_stat;


        statsamount.append(statsname);
        statsamount.append(statvalue);
        pokemonstats.append(statsamount);
    });
};

const error = () => {
    titlepokemon.innerHTML = "No se ha encontrado";
    pokemonimg.setAttribute("src", "/img/poke-shadow.png");

    pokemonheader.innerHTML = "";
    pokemonstats.innerHTML = "";
    pokemonimg.background = "";
    nordenpokemon.innerHTML = "";
    pokemonimg.style.background = "";
}
