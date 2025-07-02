import * as vscode from 'vscode';

export const bnfOutputChannel = vscode.window.createOutputChannel('BNF Highlight');

export function logBnf(message: string) {
  bnfOutputChannel.appendLine(message);
}
