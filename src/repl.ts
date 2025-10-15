import type { State } from "./state.js";


export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter((w) => w !== "");
}

export  async function startREPL(state: State): Promise<void>  {
  state.readline.prompt();
  state.readline.on("line", async (input: string) => {
    const words = cleanInput(input);
    const commandName = words[0] ?? "";
    const cmd = state.commands[commandName];
    if (cmd) {
      try {
        await cmd.callback(state);
      } catch (error) {
        console.log(`Error fetching data, try again: ${(error as Error).message}`);
    }
 
    } else {
      console.log("Unknown command - Use command 'help' for instructions");
    }
    state.readline.prompt();
  });
}



  

 

    

     
 