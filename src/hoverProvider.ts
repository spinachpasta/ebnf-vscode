import * as vscode from 'vscode';
import { parseBnf } from './bnfParser';

export class BnfHoverProvider implements vscode.HoverProvider {
  provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
    const text = document.getText();
    const { symbols } = parseBnf(text);
    const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z][a-zA-Z0-9_-]*/);
    if (!wordRange) return;
    const word = document.getText(wordRange);
    for (const s of symbols) {
      if (s.name === word) {
        return new vscode.Hover(`${s.name} ::= ${s.rhs}`);
      }
    }
    return;
  }
}
