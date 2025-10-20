import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import { commandExplore} from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import type { CLICommand } from "./state.js";
import { commandInspect } from "./command_inspect.js";


export function getCommands(): Record<string, CLICommand> {
  return {
    help: { name: "help", description: "Displays a help message", callback: commandHelp },
    exit: { name: "exit", description: "Exit the Pokedex", callback: commandExit },
    map:  { name: "map", description: "Shows next page of location areas", callback: commandMapForward },
    mapb: { name: "mapb", description: "Shows previous page of location areas", callback: commandMapBack},
    explore: { name: "explore", description: "Shows Pokemon in the Area", callback: commandExplore},
    catch: { name: "catch", description: "Attempt to catch a Pokemon", callback: commandCatch},
    inspect: {name: "inspect <pokemon_name>", description: "Shows details of a Pokemon that is in the Pokedex", callback: commandInspect},
  };
}
