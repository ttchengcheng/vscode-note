import * as vscode from 'vscode';

export { openUrl, installCommand };

interface ExecutableCommand {
  exec(): void;
}

function installCommand<T extends ExecutableCommand>(
  context: vscode.ExtensionContext,
  command: string,
  constructor: new () => T) {
  const disposable = vscode.commands.registerCommand(command, () => {
    new constructor().exec();
  });
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
