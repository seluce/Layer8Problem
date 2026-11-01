/**
 * SHA-1 of a string, synchronously, without the platform's crypto.
 *
 * WHY NOT crypto.subtle. The narration finds its audio file by the checksum of
 * the sentence on screen - see tools/voice-text.mjs, fileFor(). The platform's
 * own digest would do the job on GitHub Pages and refuse it on Steam:
 * SubtleCrypto is gated behind a secure context, and the Electron build loads
 * index.html over file://, which is not one. The narrator would have worked in
 * the browser and been silent in the shipped game, with nothing in either to
 * say why. It is also async, and the terminal fills synchronously.
 *
 * WHY SHA-1 AND NOT SOMETHING SMALLER. The manifest already records this exact
 * digest for every piece, as its drift check. Reusing it means the file name
 * and the drift check are the same number, computed by two implementations -
 * and tools/voice.test.mjs holds this one against Node's own over all 9,296
 * pieces in both trees, which is a stronger proof than a hash invented here
 * could have.
 *
 * Not for anything that needs to be hard to forge. SHA-1 is broken for that,
 * and nothing here asks it to be: this is a name, not a signature.
 */

/** The 12 hex digits the manifest files a piece under. */
export const voiceHash = (text) => sha1Hex(text).slice(0, 12);

export function sha1Hex(text) {
    const bytes = new TextEncoder().encode(text);
    const len = bytes.length;

    // One 0x80 byte, then zeroes, then the bit length in the last eight: so
    // the message needs len + 9 bytes at least, rounded up to whole blocks.
    const blocks = ((len + 8) >> 6) + 1;
    const w32 = new Uint32Array(blocks * 16);
    for (let i = 0; i < len; i++) w32[i >> 2] |= bytes[i] << (24 - (i % 4) * 8);
    w32[len >> 2] |= 0x80 << (24 - (len % 4) * 8);
    // Big-endian 64-bit bit count. The high word matters only above 512 MB and
    // is written anyway - a conditional here would be a branch nothing ever
    // takes and nothing ever tests.
    w32[blocks * 16 - 2] = Math.floor(len / 0x20000000);
    w32[blocks * 16 - 1] = (len * 8) % 0x100000000;

    let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;
    const w = new Uint32Array(80);

    for (let b = 0; b < w32.length; b += 16) {
        for (let i = 0; i < 16; i++) w[i] = w32[b + i];
        for (let i = 16; i < 80; i++) {
            const x = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
            w[i] = (x << 1) | (x >>> 31);
        }

        let a = h0, c = h1, d = h2, e = h3, f = h4;
        for (let i = 0; i < 80; i++) {
            let mix, k;
            if (i < 20)      { mix = (c & d) | (~c & e);            k = 0x5a827999; }
            else if (i < 40) { mix = c ^ d ^ e;                     k = 0x6ed9eba1; }
            else if (i < 60) { mix = (c & d) | (c & e) | (d & e);   k = 0x8f1bbcdc; }
            else             { mix = c ^ d ^ e;                     k = 0xca62c1d6; }
            const next = (((a << 5) | (a >>> 27)) + mix + f + k + w[i]) >>> 0;
            f = e; e = d; d = ((c << 30) | (c >>> 2)) >>> 0; c = a; a = next;
        }

        h0 = (h0 + a) >>> 0; h1 = (h1 + c) >>> 0; h2 = (h2 + d) >>> 0;
        h3 = (h3 + e) >>> 0; h4 = (h4 + f) >>> 0;
    }

    return [h0, h1, h2, h3, h4].map(x => x.toString(16).padStart(8, '0')).join('');
}
