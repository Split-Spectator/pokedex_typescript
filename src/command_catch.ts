import { type State } from "./state.js";



export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const baseChance = 0.6;
    const pokemon = args[0];
    if (!pokemon) {
        console.log("Please specify a pokemon to catch");
        return;
    }
    if (state.pokedex[pokemon]) {
        console.log(`${pokemon} is already in your Pokedex!`);
        return;
      }


   console.log(`Throwing a Pokeball at ${pokemon}...`);
   const data = await state.pokeapi.fetchPokemon(pokemon);

   const base = data.base_experience ?? 0;
   const capped = Math.min(base, 300);
   const hardness = capped / 300;
   const minCatch = 0.1;
   const catchChance = Math.max(minCatch, baseChance * (1 - hardness));
   
   if (Math.random() < catchChance){
    console.log(`${pokemon} was caught!`);
    if (!state.pokedex[pokemon]) {
        state.pokedex[pokemon] = data;
        console.log(`${pokemon} was added to the Pokedex!`);
    }
   } else {
    console.log(`${pokemon} escaped!`);
   }
}