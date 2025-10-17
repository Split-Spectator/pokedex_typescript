import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import { commandExplore} from "./command_explore.js";
import type { CLICommand } from "./state.js";


export function getCommands(): Record<string, CLICommand> {
  return {
    help: { name: "help", description: "Displays a help message", callback: commandHelp },
    exit: { name: "exit", description: "Exit the Pokedex", callback: commandExit },
    map:  { name: "map", description: "Shows next page of location areas", callback: commandMapForward },
    mapb: { name: "mapb", description: "Shows previous page of location areas", callback: commandMapBack},
    explore: { name: "explore", description: "Shows Pokemon in the Area", callback: commandExplore},
  };
}
