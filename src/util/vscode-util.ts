import * as vscode from 'vscode';

export { installCommand };

function installCommand(
  context: vscode.ExtensionContext,
  command: string,
  callback: (...args: any[]) => any, thisArg?: any) {
  const disposable = vscode.commands.registerCommand(command, callback, thisArg);
  context.subscriptions.push(disposable);
}
