const pokemonList = ["charmander", "squirtle", "bulbasaur", "pikachu", "gible"];
const listElement = document.getElementById("pokemon-list");

pokemonList.forEach((pokemonName) => {
  // Fetch species data to get the evolution chain URL
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
    .then((speciesData) => {
      const evolutionChainUrl = speciesData.url;

      // Fetch the evolution chain data
      fetch(evolutionChainUrl)
        .then((evolutionData) => {
          const evolutions = [];
          getEvolutions(evolutionData.chain, evolutions).then(() => {
            // Display the Pokémon and its evolutions with images
            const listItem = document.createElement("li");

            // Create the main container for the Pokémon evolution
            const pokemonEvolutionDiv = document.createElement("div");
            pokemonEvolutionDiv.className = "pokemon-evolution";

            // Create the span for the Pokémon name
            const pokemonNameSpan = document.createElement("span");
            pokemonNameSpan.className = "pokemon-name";
            pokemonNameSpan.textContent = capitalize(pokemonName) + ":";

            // Append the name span to the main container
            pokemonEvolutionDiv.appendChild(pokemonNameSpan);

            // Create the container for the evolution sequence
            const evolutionSequenceDiv = document.createElement("div");
            evolutionSequenceDiv.className = "evolution-sequence";
            evolutionSequenceDiv.id = `${pokemonName}-evolutions`;

            // Append the main container and the evolution sequence to the list item
            listItem.appendChild(pokemonEvolutionDiv);
            listItem.appendChild(evolutionSequenceDiv);

            const evolutionSequence = document.getElementById(
              `${pokemonName}-evolutions`
            );

            evolutions.forEach((evo, index) => {
              // Add the image and name for each evolution stage
              const evoContainer = document.createElement("div");
              evoContainer.style.display = "flex";
              evoContainer.style.flexDirection = "column";
              evoContainer.style.alignItems = "center";

              const evoImage = document.createElement("img");
              evoImage.src = evo.image;
              evoImage.alt = evo.name;

              const evoName = document.createElement("span");
              evoName.textContent = capitalize(evo.name);

              evoContainer.appendChild(evoImage);
              evoContainer.appendChild(evoName);
              evolutionSequence.appendChild(evoContainer);

              // Add an arrow between evolutions, except after the last one
              if (index < evolutions.length - 1) {
                const arrow = document.createElement("span");
                arrow.className = "evolution-arrow";
                arrow.textContent = "→";
                evolutionSequence.appendChild(arrow);
              }
            });
          });
        })
        .catch((error) => {
          console.error(
            `Error fetching evolution data for ${pokemonName}:`,
            error
          );
        });
    })
    .catch((error) => {
      console.error(`Error fetching species data for ${pokemonName}:`, error);
    });
});

// Function to traverse the evolution chain and fetch images
async function getEvolutions(chain, evolutions) {
  // Fetch Pokémon data to get the image
  const pokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`
  ).then((response) => response.json());

  evolutions.push({
    name: chain.species.name,
    image:
      pokemonData.sprites.front_default || "https://via.placeholder.com/50",
  });

  if (chain.evolves_to.length > 0) {
    // Handle multiple evolutions
    for (const evolution of chain.evolves_to) {
      await getEvolutions(evolution, evolutions);
    }
  }
}

// Function to capitalize the first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log = function () {
  alert("No cheating! :)");
};
