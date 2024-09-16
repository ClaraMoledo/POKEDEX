const url = "https://pokeapi.co/api/v2/";

// Seleção dos elementos HTML
const pokemonNameEl = document.getElementById('java-nome');
const pokemonImgEl = document.getElementById('java-img');
const pokemonTypeEl = document.getElementById('java-tipo');
const pokemonHeightEl = document.getElementById('java-altura');
const pokemonWeightEl = document.getElementById('java-peso');
const pokemonStrengthEl = document.getElementById('java-forca');
const errorMessageEl = document.getElementById('java-error');
const searchInput = document.getElementById('java-id-nome');

// Variáveis globais
let currentPokemonId = 1;

// Função para buscar Pokémon na API
function fetchPokemon(pokemonIdOrName) {
    fetch(`${url}pokemon/${pokemonIdOrName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Atualizar as informações do Pokémon
            updatePokemonCard(data);
            currentPokemonId = data.id;
            errorMessageEl.textContent = ''; // Limpa mensagem de erro
        })
        .catch(error => {
            errorMessageEl.textContent = error.message;
        });
}

// Função para atualizar o card com informações do Pokémon
function updatePokemonCard(pokemon) {
    pokemonNameEl.textContent = `${pokemon.name} (#${pokemon.id})`;
    pokemonImgEl.src = pokemon.sprites.front_default;
    pokemonImgEl.alt = pokemon.name;

    // Atualiza os tipos e o fundo
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    pokemonTypeEl.textContent = `Tipo: ${types.join(', ')}`;
    
    // Atualiza a altura e o peso
    pokemonHeightEl.textContent = `Altura: ${pokemon.height / 10} m`; // Altura em metros
    pokemonWeightEl.textContent = `Peso: ${pokemon.weight / 10} kg`;   // Peso em quilogramas

    // Calcula a força total
    const totalStrength = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
    pokemonStrengthEl.textContent = `Força: ${totalStrength}`;

    // Remove classes antigas
    document.getElementById('java-card').className = 'java-card';
    
    // Adiciona a classe do primeiro tipo para mudar o fundo e box-shadow
    document.getElementById('java-card').classList.add(types[0]);

    // Adiciona evento para mostrar vantagens/desvantagens ao clicar na imagem
    pokemonImgEl.onclick = () => showAdvantages(types[0]);
}

// Função para mostrar vantagens/desvantagens ao clicar na imagem do Pokémon
function showAdvantages(type) {
    const advantages = {
        normal: 'Normal é fraco contra Lutador e não tem resistências específicas. Imune a Fantasma.',
        fire: 'Fogo é forte contra Grama, Gelo, Inseto e Aço. Fraco contra Água, Pedra e Terra.',
        water: 'Água é forte contra Fogo, Pedra e Terra. Fraco contra Elétrico e Grama.',
        grass: 'Grama é forte contra Água, Pedra e Terra. Fraco contra Fogo, Gelo, Voador, Inseto e Veneno.',
        electric: 'Elétrico é forte contra Água e Voador. Fraco contra Terra. Não afeta o tipo Terra.',
        ice: 'Gelo é forte contra Grama, Terra, Voador e Dragão. Fraco contra Fogo, Lutador, Pedra e Aço.',
        fighting: 'Lutador é forte contra Normal, Gelo, Pedra, Aço e Sombrio. Fraco contra Voador, Psíquico e Fada.',
        poison: 'Veneno é forte contra Grama e Fada. Fraco contra Terra e Psíquico.',
        ground: 'Terra é forte contra Fogo, Elétrico, Veneno, Pedra e Aço. Fraco contra Água, Grama e Gelo. Imune a Elétrico.',
        flying: 'Voador é forte contra Grama, Lutador e Inseto. Fraco contra Elétrico, Gelo e Pedra. Imune a Terra.',
        psychic: 'Psíquico é forte contra Lutador e Veneno. Fraco contra Inseto, Sombrio e Fantasma.',
        bug: 'Inseto é forte contra Grama, Psíquico e Sombrio. Fraco contra Fogo, Voador e Pedra.',
        rock: 'Pedra é forte contra Fogo, Gelo, Voador e Inseto. Fraco contra Água, Grama, Lutador, Terra e Aço.',
        ghost: 'Fantasma é forte contra Psíquico e Fantasma. Fraco contra Sombrio. Imune a Normal e Lutador.',
        dragon: 'Dragão é forte contra Dragão. Fraco contra Gelo, Dragão e Fada.',
        dark: 'Sombrio é forte contra Psíquico e Fantasma. Fraco contra Lutador, Inseto e Fada. Imune a Psíquico.',
        steel: 'Aço é forte contra Gelo, Pedra e Fada. Fraco contra Fogo, Lutador e Terra. Resistente a Venenoso.',
        fairy: 'Fada é forte contra Lutador, Dragão e Sombrio. Fraco contra Veneno e Aço. Imune a Dragão.'
    };

    // Exibe as vantagens e desvantagens ou uma mensagem padrão caso o tipo não seja encontrado
    alert(advantages[type] || 'Não há informações sobre esse tipo.');
}

// Função para definir a cor de fundo com base no tipo do Pokémon
function getBackgroundColor(type) {
    switch (type) {
        case 'normal': return 'beige';            // Normal
        case 'fire': return 'red';                // Fogo
        case 'water': return 'blue';              // Água
        case 'grass': return 'green';             // Grama
        case 'electric': return 'yellow';         // Elétrico
        case 'psychic': return 'pink';            // Psíquico
        case 'ice': return 'lightblue';           // Gelo
        case 'bug': return 'lightgreen';          // Inseto
        case 'rock': return 'brown';              // Pedra
        case 'ghost': return 'purple';            // Fantasma
        case 'fairy': return 'lightpink';         // Fada
        case 'fighting': return 'orange';         // Lutador
        case 'poison': return 'violet';           // Veneno
        case 'ground': return 'tan';              // Terra
        case 'flying': return 'skyblue';          // Voador
        case 'steel': return 'silver';            // Aço
        case 'dragon': return 'darkblue';         // Dragão
        case 'dark': return 'black';              // Sombrio
        // Cor padrão para tipos não reconhecidos
        default: return 'white';
    }
}

// Função para carregar Pokémon anterior
function loadPreviousPokemon() {
    if (currentPokemonId > 1) {
        fetchPokemon(currentPokemonId - 1);
    }
}

// Função para carregar Pokémon seguinte
function loadNextPokemon() {
    fetchPokemon(currentPokemonId + 1);
}

// Adiciona evento aos botões de navegação
document.getElementById('java-esquerda').addEventListener('click', loadPreviousPokemon);
document.getElementById('java-direita').addEventListener('click', loadNextPokemon);

// Adiciona evento para o botão de busca
document.getElementById('java-busca').addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        fetchPokemon(searchTerm);
    }
});

// Adiciona evento para a tecla Enter no campo de pesquisa
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede a ação padrão do Enter (pode ser útil dependendo do contexto)
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            fetchPokemon(searchTerm);
        }
    }
});

// Inicializa com o primeiro Pokémon
fetchPokemon("snorlax");