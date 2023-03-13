const formElement = document.querySelector('[data-id="form"]');
const userInputElement = document.querySelector('[data-id="user-input"]');
const pokemonNameElement = document.querySelector('[data-id="pokemon-name"]');
const pokemonImageElement = document.querySelector('[data-id="pokemon-image"]');
const typeTextElement = document.querySelector('[data-id="type"]');
const hpTextElement = document.querySelector('[data-id="hp"]');
const attackTextElement = document.querySelector('[data-id="attack"]');
const defenseTextElement = document.querySelector('[data-id="defense"]');
const errorMessageElement = document.querySelector('[data-id="error-message"]');

formElement.addEventListener("submit", handleFormSubmit);
userInputElement.addEventListener("input", () => {
  errorMessageElement.classList.add("error-message--hidden");
});

function handleFormSubmit(event) {
  event.preventDefault();
  const userInput = userInputElement.value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("Pokemon not found");
      }
    })
    .then(displayData)
    .catch((error) => {
      if (error.message === "Pokemon not found") {
        const errorMessage = "Please type a valid pokemon name";
        errorMessageElement.classList.remove("error-message--hidden");
        errorMessageElement.textContent = errorMessage;
      } else {
        const errorMessage = "Error: please try again later";
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.classList.remove("error-message--hidden");
      }
    });
}

function displayData(data) {
  console.log(data);
  const pokemonName = data.name;
  const pokemonImage = data.sprites.front_default;
  const pokemonType = data.types[0].type.name;
  const pokemonHP = data.stats[0].base_stat;
  const pokemonAttack = data.stats[1].base_stat;
  const pokemonDefense = data.stats[2].base_stat;
  pokemonNameElement.textContent = pokemonName;
  pokemonImageElement.src = pokemonImage;
  typeTextElement.textContent = pokemonType;
  hpTextElement.textContent = pokemonHP;
  attackTextElement.textContent = pokemonAttack;
  defenseTextElement.textContent = pokemonDefense;
}
