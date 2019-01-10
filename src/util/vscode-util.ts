import * as vscode from 'vscode';

export { installCommand, openUrl };

function installCommand(
  context: vscode.ExtensionContext,
  command: string,
  callback: (...args: any[]) => any, thisArg?: any) {
  const disposable = vscode.commands.registerCommand(command, callback, thisArg);
  context.subscriptions.push(disposable);
}

/**
 * Open an uri
 * @param uriString value like `http://www.pinkbike.com/news/fail-of-the-month-june-2016.html`
 *
 * @see https://github.com/Microsoft/vscode/issues/9651
 */
function openUrl(uriString: string): void {
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(uriString));
}
