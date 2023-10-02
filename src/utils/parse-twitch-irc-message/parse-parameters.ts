import { Command } from 'src/types';

// Parsing the IRC parameters component if it contains a command (e.g., !dice).
export function parseParameters(rawParametersComponent: string, command: Command): Command {
    const index = 0;
    const commandParts = rawParametersComponent.slice(index + 1).trim();
    const paramsIndex = commandParts.indexOf(' ');

    if (paramsIndex === -1) { // no parameters
        command.botCommand = commandParts.slice(0);
    }
    else {
        command.botCommand = commandParts.slice(0, paramsIndex);
        command.botCommandParams = commandParts.slice(paramsIndex).trim();
    }

    return command;
}