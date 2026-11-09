/**
 * What the narrator reads where the screen shows more than one string (7.1).
 *
 * A recording is filed under the checksum of its text, so the engine, which
 * hashes the text to find the file, and tools/voice-text.mjs, which records
 * it, have to put the pieces together the same way. They both call these.
 * Kept free of runes and of the data tree: the Node tools import this file
 * without the Svelte loader's help being needed for it.
 */

/**
 * A chapter of the chronicle as one piece: its paragraphs, a blank line
 * between them, markup and all - the hash is taken over what the book SHOWS,
 * and voice-text drops the tags on the way to the provider. The year and the
 * heading are not read: the button sits beside them, and a voice reading
 * "1899" is a guess between two ways of saying it.
 */
export function chapterNarration(chapter) {
    const parts = chapter?.paragraphs;
    if (!Array.isArray(parts) || !parts.length) return null;
    return parts.join('\n\n');
}
