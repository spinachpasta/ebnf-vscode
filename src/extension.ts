import * as vscode from 'vscode';
import { BnfSemanticTokensProvider, legend } from './semanticTokens';
import { BnfDocumentSymbolProvider } from './documentSymbolProvider';
import { BnfDefinitionProvider } from './definitionProvider';
import { BnfHoverProvider } from './hoverProvider';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider(
      { language: 'bnf' },
      new BnfSemanticTokensProvider(),
      legend
    )
  );
  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider(
      { language: 'bnf' },
      new BnfDocumentSymbolProvider()
    )
  );
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      { language: 'bnf' },
      new BnfDefinitionProvider()
    )
  );
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { language: 'bnf' },
      new BnfHoverProvider()
    )
  );
  vscode.window.showInformationMessage('BNF Highlight extension is now active!');
}

export function deactivate() {}
