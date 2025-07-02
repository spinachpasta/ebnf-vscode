import * as vscode from 'vscode';
import { parseBnf } from './bnfParser';

export class BnfDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  provideDocumentSymbols(document: vscode.TextDocument): vscode.ProviderResult<vscode.DocumentSymbol[]> {
    const text = document.getText();
    const { symbols, characters } = parseBnf(text);
    const result: vscode.DocumentSymbol[] = [];
    for (const s of symbols) {
      const start = document.positionAt(s.range[0]);
      const end = document.positionAt(s.range[1]);
      result.push(new vscode.DocumentSymbol(
        s.name,
        s.rhs,
        vscode.SymbolKind.Function,
        new vscode.Range(start, end),
        new vscode.Range(start, end)
      ));
    }
    
    for (const c of characters) {
      for (const range of c.ranges) {
        const start = document.positionAt(range[0]);
        const end = document.positionAt(range[1]);
        result.push(new vscode.DocumentSymbol(
          c.name,
          'character',
          vscode.SymbolKind.Constant,
          new vscode.Range(start, end),
          new vscode.Range(start, end)
        ));
      }
    }
      
    return result;
  }
}
