import { type State } from "./state.js";



export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const baseChance = 0.6;
    const name = args[0];
    if (!name) {
        console.log("Please specify a pokemon to catch");
        return;
    }
    if (state.pokedex[name]) {
        console.log(`${name} is already in your Pokedex!`);
        return;
      }
    if (!state.currentArea || !state.currentArea.spawns?.includes(name)) {
        console.log(`${name} isn't found here right now.`);
        return;
      }

   console.log(`Throwing a Pokeball at ${name}...`);
   const data = await state.pokeapi.fetchPokemon(name);

   const base = data.base_experience ?? 0;
   const capped = Math.min(base, 300);
   const hardness = capped / 300;
   const minCatch = 0.1;
   const catchChance = Math.max(minCatch, baseChance * (1 - hardness));
   
   if (Math.random() < catchChance){
    console.log(`${name} was caught!`);
    if (!state.pokedex[name]) {
        state.pokedex[name] = data;
        console.log(`${name} was added to the Pokedex!`);
    }
   } else {
    console.log(`${name} escaped!`);
   }
}