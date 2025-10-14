import { startREPL } from "./repl.js";
import { initState } from "./state.js";


function main(): void {
  const state = initState();
  startREPL(state);
}
main();
