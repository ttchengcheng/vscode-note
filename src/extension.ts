'use strict';

import * as vscode from 'vscode';

import { ChangeCase } from './commands/change-case.command';
import { CommonTransform } from './commands/common-transform.command';
import { StringService } from './commands/string-service.command';
import { WrapTransform } from './commands/string-wrap.command';
import { installCommand } from './util/vscode-util';

/**
 * extension entry
 * @param context extension context
 */
export function activate(context: vscode.ExtensionContext) {
  installCommand(context, 'extension.changeCase', () => { new ChangeCase().exec(); });
  installCommand(context, 'extension.stringTransform', () => { new CommonTransform().exec(); });
  installCommand(context, 'extension.stringService', () => { new StringService().exec(); });
  installCommand(context, 'extension.stringWrap', () => { new WrapTransform().exec(); });
}

/**
 * extension exit
 */
export function deactivate() {
  // nothing
}
