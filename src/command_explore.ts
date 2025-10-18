import type { State } from "./state";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  const location = args[0];
  if (!location) {
    console.log("Please specify a location to explore");
    return;
  }

  console.log(`Exploring ${location}...`);
  const data = await state.pokeapi.fetchLocation(location);

  const encounters = data.pokemon_encounters ?? [];
  const spawns = encounters.map(e => e.pokemon.name.toLowerCase());

  console.log("Found Pokemon:");
  for (const name of spawns) {
    console.log(` - ${name}`);
  }

  state.currentArea = { name: location, spawns };
}