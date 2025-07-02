import * as vscode from 'vscode';
import { parseBnf } from './bnfParser';

export class BnfDefinitionProvider implements vscode.DefinitionProvider {
  provideDefinition(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Definition> {
    const text = document.getText();
    const { symbols } = parseBnf(text);
    const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z][a-zA-Z0-9_-]*/);
    if (!wordRange) return;
    const word = document.getText(wordRange);
    for (const s of symbols) {
      if (s.name === word) {
        const start = document.positionAt(s.range[0]);
        return new vscode.Location(document.uri, start);
      }
    }
    return;
  }
}
