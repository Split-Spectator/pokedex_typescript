import type { State } from "./state.js";


export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  const name = (args[0] ?? "").toLowerCase();
  if (!name) {
    console.log("Please specify a Pokemon");
    return;
  }
  const pokemon = state.pokedex[name];
  if (!pokemon) {
    console.log(`you have not caught ${name}`);
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const s of pokemon.stats) {
    console.log(`- ${s.stat.name}: ${s.base_stat}`);
  }
  console.log("Types:");
  for (const t of pokemon.types) {
    console.log(`- ${t.type.name}`);
  }
}