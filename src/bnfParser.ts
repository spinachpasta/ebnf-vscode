// BNF Parser: Extracts symbols (LHS identifiers) and characters (identifiers never on LHS)

import { logBnf } from './logger';

export interface BnfSymbol {
    name: string;
    range: [number, number]; // [start, end] offset in document
    rhs: string;
}

export interface BnfCharacter {
    name: string;
    ranges: [number, number][];
}

export interface BnfParseResult {
    symbols: BnfSymbol[];
    characters: BnfCharacter[];
}

export function parseBnf(text: string): BnfParseResult {
    logBnf('parseBnf called');
    logBnf('Input text:');
    logBnf(text);
    // Remove single-line comments (//...) by replacing with spaces, preserving line breaks
    // This regex matches '//' followed by any characters up to a line break or end of string
    const commentRegex = /\/\/[^\r\n]*/g;
    const textNoComments = text.replace(commentRegex, (match) => ' '.repeat(match.length));
    logBnf('textNoComments text:');
    logBnf(textNoComments);
    const symbolDefs: Record<string, BnfSymbol> = {};
    const allIdentifiers: Record<string, [number, number][]> = {};
    // Split text into rules by semicolons, treating line breaks as empty characters
    const textNoLineBreaks = textNoComments.replace(/[\r\n]+/g, (match) => ' '.repeat(match.length));
    const rules = textNoLineBreaks.split(';');
    const ruleRegex = /^\s*([a-zA-Z][a-zA-Z0-9_-]*)\s*=\s*(.*?)\s*;/;
    const idRegex = /[a-zA-Z][a-zA-Z0-9_-]*/g;



    let offset = 0;
    for (const rule of rules) {
        logBnf('Rule text:');
        logBnf(rule);
        const ruleMatch = ruleRegex.exec(rule.trim() + ";");
        if (ruleMatch) {
            const [full, lhs, rhs] = ruleMatch;
            logBnf("LHS:");
            logBnf(lhs);
            const start = offset + rule.indexOf(lhs);
            const end = start + lhs.length;
            symbolDefs[lhs] = { name: lhs, range: [start, end], rhs };
            // Mark LHS as seen
            if (!allIdentifiers[lhs]) allIdentifiers[lhs] = [];
            allIdentifiers[lhs].push([start, end]);
            // Find identifiers in RHS
            let m;
            while ((m = idRegex.exec(rhs))) {
                const id = m[0];
                // Offset in line: after ::=, so add index of rhs in line
                const idStart = offset + rule.indexOf(rhs) + m.index;
                const idEnd = idStart + id.length;
                if (!allIdentifiers[id]) allIdentifiers[id] = [];
                allIdentifiers[id].push([idStart, idEnd]);
            }
        } else {
        }
        offset += rule.length + 1;
    }
    // Characters: identifiers never on LHS
    const symbols = Object.values(symbolDefs);
    const characters: BnfCharacter[] = [];
    for (const id in allIdentifiers) {
        if (!symbolDefs[id]) {
            characters.push({ name: id, ranges: allIdentifiers[id] });
        }
    }
    // logBnf('parseBnf result:');
    // logBnf(JSON.stringify({ symbols, characters }, null, 2));
    return { symbols, characters };
}
