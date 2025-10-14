import type { State } from "./state.js";


export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter((w) => w !== "");
}

export function startREPL(state: State): void {
  state.readline.prompt();
  state.readline.on("line", (input: string) => {
    const words = cleanInput(input);
    const commandName = words[0] ?? "";
    const cmd = state.commands[commandName];
    if (!cmd) {
      console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
      state.readline.prompt();
      return;
    }
    cmd.callback(state);
    state.readline.prompt();
  });
}



  

 

    

     
 