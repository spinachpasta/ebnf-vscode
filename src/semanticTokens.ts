import * as vscode from 'vscode';
import { parseBnf } from './bnfParser';

const tokenTypes = ['character', 'symbol'];
const tokenModifiers: string[] = [];

export const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

export class BnfSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
  async provideDocumentSemanticTokens(document: vscode.TextDocument): Promise<vscode.SemanticTokens> {
    const text = document.getText();
    const { symbols, characters } = parseBnf(text);
    const builder = new vscode.SemanticTokensBuilder(legend);
    for (const s of symbols) {
      const start = document.positionAt(s.range[0]);
      const len = s.range[1] - s.range[0];
      builder.push(start.line, start.character, len, 1, 0); // 1 = symbol
    }
    for (const c of characters) {
      for (const range of c.ranges) {
        const start = document.positionAt(range[0]);
        const len = range[1] - range[0];
        builder.push(start.line, start.character, len, 0, 0); // 0 = character
      }
    }
    return builder.build();
  }
}
