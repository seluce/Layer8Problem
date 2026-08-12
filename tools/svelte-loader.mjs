// Node loader hook: compiles .svelte.js modules so runes are active in tests.
import { compileModule } from 'svelte/compiler';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export async function load(url, context, nextLoad) {
    if (url.endsWith('.svelte.js')) {
        const source = readFileSync(fileURLToPath(url), 'utf-8');
        const { js } = compileModule(source, { generate: 'client', filename: url });
        return { format: 'module', source: js.code, shortCircuit: true };
    }
    return nextLoad(url, context);
}
