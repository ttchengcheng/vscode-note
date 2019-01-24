import * as vscode from 'vscode';
import { StringTransform } from './string-transform.command';

export { WrapTransform };

function wrapWithRegion(s: string): string {
  return [
    '// #region $1',
    '${TM_SELECTED_TEXT}',
    '// #endregion',
  ].join('\n');
}

function wrapWithCodeBlock(s: string): string {
  return [
    '```$1',
    '${TM_SELECTED_TEXT}',
    '```',
  ].join('\n');
}
class WrapTransform extends StringTransform {
  protected functionMap() {
    const functions: Array<{ label: string, fn: (s: string) => string }> = [
      { label: 'region', fn: wrapWithRegion },
      { label: 'code block', fn: wrapWithCodeBlock },
    ];
    return functions;
  }

  protected update(updates: Array<[vscode.Range, string]>): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }

    if (updates.length !== 1) { return; }

    editor.insertSnippet(new vscode.SnippetString(updates[0][1]));
  }
}
