import { TwitchIrcMessage } from 'src/types';
import { parseCommand } from './parse-command';
import { parseTags } from './parse-tags';
import { parseSource } from './parse-source';
import { parseParameters } from './parse-parameters';

// Parses an IRC message and returns a JSON object with the message's
// component parts (tags, source (nick and host), command, parameters).
// Expects the caller to pass a single message. (Remember, the Twitch
// IRC server may send one or more IRC messages in a single message.)

export function parseTwitchIrcMessage(message: string): TwitchIrcMessage | null {
    const parsedMessage: TwitchIrcMessage = {
        tags: null,
        source: null,
        command: null,
        parameters: null
    }; // Contains the component parts.

    let index = 0; // The start index. Increments as we parse the IRC message.

    let rawTagsComponent = null;
    let rawSourceComponent = null;
    let rawCommandComponent = null;
    let rawParametersComponent = null;

    // If the message includes tags, get the tags component of the IRC message.
    if (message[index] === '@') { // The message includes tags.
        const endIndex = message.indexOf(' ');
        rawTagsComponent = message.slice(1, endIndex);
        index = endIndex + 1; // Should now point to source colon (:).
    }

    // Get the source component (nick and host) of the IRC message.
    // The idx should point to the source part; otherwise, it's a PING command.
    if (message[index] === ':') {
        index++;
        const endIndex = message.indexOf(' ', index);
        rawSourceComponent = message.slice(index, endIndex);
        index = endIndex + 1; // Should point to the command part of the message.
    }

    // Get the command component of the IRC message.
    let endIndex = message.indexOf(':', index); // Looking for the parameters part of the message.
    if (endIndex === -1) { // But not all messages include the parameters part.
        endIndex = message.length;
    }

    rawCommandComponent = message.slice(index, endIndex).trim();

    // Get the parameters component of the IRC message.
    if (endIndex !== message.length) { // Check if the IRC message contains a parameters component.
        index = endIndex + 1; // Should point to the parameters part of the message.
        rawParametersComponent = message.slice(index);
    }

    // Parse the command component of the IRC message.
    parsedMessage.command = parseCommand(rawCommandComponent);

    // Only parse the rest of the components if it's a command
    // we care about; we ignore some messages.
    if (!parsedMessage.command) {
        return null;
    }

    if (rawTagsComponent) { // The IRC message contains tags.
        parsedMessage.tags = parseTags(rawTagsComponent);
    }

    parsedMessage.source = parseSource(rawSourceComponent);

    parsedMessage.parameters = rawParametersComponent;
    if (rawParametersComponent && rawParametersComponent[0] === '!') {
        // The user entered a bot command in the chat window.
        parsedMessage.command = parseParameters(rawParametersComponent, parsedMessage.command);
    }

    return parsedMessage;
}