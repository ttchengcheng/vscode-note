'use strict';

/**
 * TODO:
 *
 * * 以参数的形式把每个子命令变为可以直接调用的命令, 比如对于命令`vscodenote.changeCase` 传入参数 `PascalCase` 即直接调用 `PascalCase` 转换的子命令
 * * 重构代码结构, 目前的代码看起来还是不太容易读, 也不够简洁
 */

import * as vscode from 'vscode';

import { ChangeCase } from './commands/change-case.command';
import { CommonTransform } from './commands/common-transform.command';
import { Insert } from './commands/insert.command';
import { RunMacro } from './commands/run-macro.command';
import { StringService } from './commands/string-service.command';
import { installCommand } from './util/vscode-util';

/**
 * extension entry
 * @param context extension context
 */
export function activate(context: vscode.ExtensionContext) {
  installCommand(context, 'vscodenote.changeCase', ChangeCase);
  installCommand(context, 'vscodenote.stringTransform', CommonTransform);
  installCommand(context, 'vscodenote.stringService', StringService);
  installCommand(context, 'vscodenote.runMacro', RunMacro);
  installCommand(context, 'vscodenote.insert', Insert);
}

/**
 * extension exit
 */
export function deactivate() {
  // nothing
}
