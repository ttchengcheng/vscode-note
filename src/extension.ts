'use strict';

import * as vscode from 'vscode';

import { ChangeCase } from './commands/change-case.command';
import { CommonTransform } from './commands/common-transform.command';
import { RunMacro } from './commands/run-macro.command';
import { StringService } from './commands/string-service.command';
import { installCommand } from './util/vscode-util';

/**
 * extension entry
 * @param context extension context
 */
export function activate(context: vscode.ExtensionContext) {
  installCommand(context, 'extension.changeCase', ChangeCase);
  installCommand(context, 'extension.stringTransform', CommonTransform);
  installCommand(context, 'extension.stringService', StringService);
  installCommand(context, 'extension.runMacro', RunMacro);
}

/**
 * extension exit
 */
export function deactivate() {
  // nothing
}
