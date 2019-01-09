'use strict';

import * as vscode from 'vscode';

import { CommandChangeCase } from './commands/cmd-change-case';
import { installCommand } from './util/vscode-util';

/**
 * extension entry
 * @param context extension context
 */
export function activate(context: vscode.ExtensionContext) {
  installCommand(context, 'extension.changeCase',
    () => {
      new CommandChangeCase().exec();
    },
  );
}

/**
 * extension exit
 */
export function deactivate() {
  // nothing
}
