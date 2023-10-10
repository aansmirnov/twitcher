import { Positions, Tags } from 'src/types';

// Parses the tags component of the IRC message.
export function parseTags(tags: string): Tags | null {
    const tagsToIgnore: Record<string, null> = { // List of tags to ignore.
        'client-nonce': null,
        'flags': null
    };
    const dictParsedTags: Tags = {};// Holds the parsed list of tags.
    const parsedTags = tags.split(';'); // The key is the tag's name (e.g., color).

    parsedTags.forEach((tag) => {
        const parsedTag = tag.split('='); // Tags are key/value pairs.
        const tagValue = (parsedTag[1] === '') ? null : parsedTag[1];

        switch (parsedTag[0]) { // Switch on tag name
            case 'badges':
            case 'badge-info': {
                const key = parsedTag[0] === 'badges' ? 'badges' : 'badgesInfo';

                if (tagValue) {
                    // Holds the list of badge objects.
                    // The key is the badge's name (e.g., subscriber).
                    const dict: Record<string, string> = {};
                    const badges = tagValue.split(',');

                    badges.forEach((it) => {
                        const badgePart = it.split('/');
                        dict[badgePart[0]] = badgePart[1];
                    });

                    dictParsedTags[key] = dict;
                } else {
                    dictParsedTags[key] = null;
                }
                break;
            }
            case 'emotes': {
                if (tagValue) {
                    // Holds a list of emote objects.
                    // The key is the emote's ID.
                    const dictEmotes: Record<string, Positions[]> = {};
                    const emotes = tagValue.split('/');
                    emotes.forEach((emote) => {
                        const emoteParts = emote.split(':');

                        // The list of position objects that identify the location of the emote in the chat message.
                        const textPositions: Positions[] = [];
                        const positions = emoteParts[1].split(',');

                        positions.forEach((position) => {
                            const positionParts = position.split('-');
                            textPositions.push({
                                startPosition: Number(positionParts[0]),
                                endPosition: Number(positionParts[1])
                            });
                        });

                        dictEmotes[emoteParts[0]] = textPositions;
                    });
                    dictParsedTags[parsedTag[0]] = dictEmotes;
                } else {
                    dictParsedTags[parsedTag[0]] = null;
                }
                break;
            }
            case 'emote-sets': {
                const key = 'emoteSets';

                const emoteSetIds = tagValue?.split(',') ?? []; // Array of emote set IDs.
                dictParsedTags[key] = emoteSetIds;
                break;
            }
            case 'user-id': {
                dictParsedTags['userID'] = tagValue;
                break;
            }
            case 'display-name': {
                dictParsedTags['displayName'] = tagValue;
                break;
            }
            default:
                if (tagsToIgnore[parsedTag[0]]) {
                    break;
                }

                dictParsedTags[parsedTag[0]] = tagValue;
                break;
        }
    });

    return dictParsedTags;
}